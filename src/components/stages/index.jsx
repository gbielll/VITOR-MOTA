import React from "react";
import "./styles.css"
import { useNoteList } from "../../context/NoteListContext";
export function Stages (){


    const {noteList,setNoteList} = useNoteList();

    return(
        <div className="Conatiner">
            <h1>ETAPAS</h1>
            <section className="stepcategory">
                <p>1- Recebimento</p>
                <p>2- Lavagem</p>
                <p>3- Preparo</p>
                <p>4- Distribuição</p>
            </section>
            <hr />
            
            <section className="stepnames">
               <div>
                    {noteList && noteList.length > 0 ? (
                        noteList.map((note) => {
                            if (note.etapa == 1) {
                                return <p key={note.id}>{note.title}</p>;
                            }
                            
                        })
                    ) : (
                       null
                    )}
                </div>

                <div>
                    {noteList && noteList.length > 0 ? (
                        noteList.map((note) => {
                            if (note.etapa == 2) {
                                return <p key={note.id}>{note.title}</p>;
                            }
                           
                        })
                    ) : (
                        null
                    )}
                </div>

                <div>
                    {noteList && noteList.length > 0 ? (
                        noteList.map((note) => {
                            if (note.etapa == 3) {
                                return <p key={note.id}>{note.title}</p>;
                            }
                            
                        })
                    ) : (
                        null
                    )}
                </div>

                <div>
                    {noteList && noteList.length > 0 ? (
                        noteList.map((note) => {
                            if (note.etapa == 4) {
                                return(

                                    <p key={note.id} style={{ color: 'yellow' }}>{note.title}</p>   
                               )
                            }
                            
                        })
                    ) : (
                        null
                    )}
                </div>


            </section>
        </div>

    )
}