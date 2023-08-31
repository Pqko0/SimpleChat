import Text from './comps/text';
import TextArea from './comps/textarea';
import './App.css';

function App() {
  return (
    <div className='App' class="bg-slate-900 h-screen">
      <div class="flex items-center flex-col h-screen">
        <div class="p-1 w-5/6 md:w-2/3 mt-4 md:mt-10 h-[90vh] flex-col flex justify-between">
          <TextArea />
          <Text/>
        </div>
      </div>
    </div>
  );
}

export default App;
