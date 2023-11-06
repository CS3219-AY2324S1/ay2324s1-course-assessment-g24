import CodeEditor from '../components/CodeEditor';
import PageWrapper from '../components/PageWrapper';
// import PageWrapper from '../components/PageWrapper';

const WEditor = () => {
//   function initiateRecord(enumX: string, defaultValue: string): Record<string, string>{
//     const toReturn: Record<string, string> = {} ;
//     toReturn[enumX] = defaultValue;
//     return toReturn;
// }
  enum DIFFICULTY {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
  }

  // enum LANGUAGE {
  //   PYTHON = 'PYTHON',
  // }

  
  return (
    <PageWrapper>
      <CodeEditor title={'title'} difficulty={DIFFICULTY.EASY} 
      description={'description'} examples={[]} constraints={[]} />
    </PageWrapper>
  );
};

export default WEditor;