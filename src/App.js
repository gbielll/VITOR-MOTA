import Header from "./components/Header";
import Logo from "./components/Logo";
import Actions from "./components/Actions";
import NotesArea from "./components/NotesArea";
import Notes from "./components/Notes";
import HighlightProvider from "./context/HighlightContext"
import NoteListProvider from "./context/NoteListContext";
import NoteFormProvider from "./context/NoteFormContext";
import { Stages } from "./components/stages";




function App() {
  return (
    <NoteFormProvider>
    <NoteListProvider>
    <HighlightProvider> {/*com isso todos os filhos de highlight tem acesso ao useContext */}
    
      <Header>
        <Logo/>
        <Actions/>
      </Header>
      <NotesArea>
        <Notes/> {/* O que acontece: estou enviando um componente dentro de outro, para que isso seja possível
                    (igual passar parâmetros), devo fazer com que a NotesArea (classe pai) receba como props em seu arquivo a childre
                     */}
      </NotesArea>

      <Stages/>

    </HighlightProvider>
    </NoteListProvider>
    </NoteFormProvider>
  );
}

export default App;