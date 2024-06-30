import React from "react"
import {FaPlus,FaPencilAlt,FaTrash} from "react-icons/fa"
import "./styles.css";
import { useNoteForm } from "../../context/NoteFormContext";
import { useHighlight } from "../../context/HighlightContext";
import { useNoteList } from "../../context/NoteListContext";

//para usar icones : yarn add react-icons
//import {FaPlus,FaPencilAlt,FaTrash} from "react-icons/fa"

export default function Actions(){

    const {visibleForm,setVisibleForm,setTitle,setDescription,falha,setFalha} = useNoteForm();
    const {highlight,setHighlight} = useHighlight()
    const {noteList,setNoteList} = useNoteList();


    //APENAS PARA ABRIR O FORMULÁRIO
    function createHandler() { //para aparecer o form

        //AQUI É CASO ESTEJA LIGADO O VISIBLE E O HIGHLITHH, COM ISSO, ELE VAI ABRIR O VISIBLE, MAS ANULAR APAGAR OS CAMPOS DO form, da nota anterior
        if(visibleForm && highlight){ //se for V, ou seja, vispivel, eu fecho. mesmo com a janela aberta do form,se eu apertar em criar um novo, tem q apagar as infromações no title e description
            setTitle("");//deixa os campos vazioas quandot u aperta no form, para n ficar as informações antigas
            setDescription("");
            setHighlight(false); //fica falso, ja q entendos q se apeertamos em criar uma nova note, n tem pq uma ja esta definida
        }else{
            setVisibleForm(!visibleForm); // Esta função parece estar correta
        }
      }


      function editHandler(){
         if(highlight){
             const highlightNote = noteList.find((note)=>note.id === highlight) //aqui ele vai pecorrer o noteList(com o comando find), atribuir em note os dados e retornar o que tover o note.id = hightlight, pois qundo eu clico esse hightligh recebe o id da nota
              //colocando no form esses dados para que eu possa mudar, ele acessa de cada note atraves do id
             setTitle(highlightNote.title); //acesando os dados araves da nota, pq no comando acima eu receno a nota por completo, que ta armazenado no highlightNote
             setDescription(highlightNote.description);
             setFalha(highlightNote.falha);
             setVisibleForm(!visibleForm) //flip - se tiver V fica F. se tiver F fica V, com os dados a cima

            }
      }

    function deleteHandler(){
         if(highlight){
            setTitle("");
            setDescription("");
            setFalha("");
            setHighlight(false);

            const highlightNote = noteList.findIndex((note)=>note.id === highlight) //mesma ideia, ocontece que aqui ele procura retorna apenas o index da nota
            noteList.splice(highlightNote,1) //função splice remove umm intem no array/ splice (index, qtd q quero remover)
            setNoteList([...noteList])//atualizo o noteList, sem a nota q a gente removeu
    }
}

    return(
        <div className="actions">
            <button className="create" onClick={createHandler}>
                <FaPlus className="icon"></FaPlus>
            </button>
            <button className="edit" onClick={editHandler}>
                <FaPencilAlt className={`icon ${!highlight && "disabled"}`} ></FaPencilAlt> {/*esse icon disabled, é como uma classe dentro de outra, reservada apenas para quem tiver com icon disabled, eles estao bloqueado sem hilight
                                                                                                      pois se eu quiser ultilizar o "icon" -class, ajuda para n ficar criando varias class*/ }
            </button>
            <button className="delete" onClick={deleteHandler}>
                <FaTrash className={`icon ${!highlight && "disabled"}`}></FaTrash> {/*se n houver highlight(pois ele pode ser V ou ter um id, ou ser falso), aplica o desible, fica desabilitado */}
            </button>
        </div>
    );
}