import { useAuth } from "./AuthContext";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { DIFFICULTY, LANGUAGE } from "../utils/enums";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Question } from "../utils/types";

interface MatchingState {
  count?: number;
  isMatching: boolean;
  roomId?: number;
  questions: Question[];
}

interface IMatchingContext extends MatchingState {
  startMatch: (difficulty: DIFFICULTY) => void;
  leaveSession: (returnHome?: boolean) => void;
  endSession: () => void;
  stopQueuing: () => void;
}

const initialState: MatchingState = {
  isMatching: false,
  questions: [{}]
}

const MatchingContext = createContext<IMatchingContext>({
  ...initialState,
  startMatch: () => {},
  leaveSession: () => {},
  stopQueuing: () => {},
  endSession: () => {},
});

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [socket, setSocket] = useState<Socket>();
  const [count, setCount] = useState<number | undefined>();
  const [roomId, setRoomId] = useState<number>();
  const [questions, setQuestions] = useState<Question[]>();
  const [isMatching, setIsMatching] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_MATCHING_SERVICE_URL || '', {
      autoConnect: false,
    });

    setSocket(socket);

    socket.on('matchCountdown', (counter) => {
      if (counter === 0) {
        setCount(undefined);
        setIsMatching(false);
        return toast({
          title: "Unsuccessful!",
          description: "Couldn't find a match! Please try again.",
          status: "info",
          duration: 5000,
          isClosable: true
        })
      }

      setCount(counter);
    });

    socket.on('matchSuccess', ({ id, questions }) => {
      toast({
        title: "Hooray!",
        description: "Match Found!",
        status: "success",
        duration: 5000,
        isClosable: true
      })

      setCount(undefined);
      setRoomId(id);
      setQuestions(questions);
      setIsMatching(false);
      navigate("/workspacepage");
    });

    socket.on('matchLeave', () => {
      reset(() => {
        toast({
          title: "Oops!",
          description: "Someone left the workspace!",
          status: "warning",
          duration: 5000,
          isClosable: true
        })
      });
    });

    return () => {
      socket.off('matchSuccess');
      socket.off('matchCountdown');
      socket.off('matchLeave');
      socket.off('timeTick');
      socket.disconnect();
    };
  }, []);

  const startMatch = (difficulty: DIFFICULTY) => {
    if (!socket || !user) return;
    if (!socket.connected) socket.connect();

    setIsMatching(true);
    socket.emit('matchStart', { difficulty, language: LANGUAGE.PYTHON });
    setCount(30);
  };

  const reset = (callback: () => void) => {
    setRoomId(undefined);
    setQuestions([]);
    navigate('/');
    callback();
  };

  const endSession = () => {
    socket?.emit('matchEndSession', roomId);
    reset(() => {
      toast({
        title: "Coding Session Ended!",
        status: "success",
        duration: 5000,
        isClosable: true
      })
    });
  };

  const leaveSession = () => {
    reset(() => {
      socket?.emit('matchLeave');
    });
  };

  const stopQueuing = () => {
    socket?.emit('stopQueuing');
    setIsMatching(false);
  };

  const memoedValue = useMemo(
    () => ({
      count,
      isMatching,
      roomId,
      questions: questions || [{}],
      startMatch,
      leaveSession,
      endSession,
      stopQueuing,
    }),
    [count, isMatching, roomId, questions, socket, user]
  );

  return (
    <MatchingContext.Provider value={memoedValue}>{children}</MatchingContext.Provider>
  );
};

export const MatchingConsumer = MatchingContext.Consumer;
export const useMatching = () => useContext(MatchingContext);
