import React from "react";
import "./styles.css";
import NoteForm from "../NoteForm"
import { useNoteForm } from "../../context/NoteFormContext";

export default function NotesArea({children}){
    const {visibleForm} = useNoteForm(); //pegando apenas o visibleForm para validar se ele é V
    return(
     <article className="notes-area"> {/*usado para definir blocos de artigos, apenas uma definição melhor*/}
         {children} {/*recendo o componente que ta dentro do outro coponente  como children*/}
         {visibleForm && <NoteForm/>} {/*&& valida se é V =, se for V ele chama o <NoteForm/>*/}
     </article>
    );
}