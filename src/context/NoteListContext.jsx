import React, {useState,useContext, createContext} from "react";

const NoteListContext = createContext();  /*essa variável chama a funcão createContext, o contexto posso especificar de maneira global*/

export default function NoteListProvider({children}){

    const [noteList,setNoteList] = useState([])  //recebe um array de notas

    return( 

        /*provider = providenciar uma informação NoteListContext.Provider value={(aqui eu passo as informações - para que posso 
          acessar em outra componente essas infors: const context = useContext(NoteListContext) */
        //esse noteList,setNoteList é do set la em cima, que passo como informação
        <NoteListContext.Provider value={{noteList,setNoteList}}> 
             {children}  {/*recebe esse childre direto na function acima e todas essa childre tem acesso a esses values
                           (ao useContext desse Highlight, por isso tem q ta dentro, mas para acessar tenho que  fazer isso

                            context = useContext(HighlightContext)
                            const {highlight,setHighlight}=context;

                            para deixar mais organizado, para nao ter que fazer isso em cada componente, fiz a função a baixo com o retorno logo de cara. so consegue retonrar esse valores os filhoes 
                            do HighlightContext.provider, pois estao dentro dele
                            
                           */}       
        </NoteListContext.Provider>
    )
}

export function useNoteList(){
    const context = useContext(NoteListContext)
    const {noteList,setNoteList}=context; //destruturar esse obj, pois ele recebe do useContext(HighlightContext), atrves do value o :highlight,setHighlight
    return {noteList,setNoteList}; //retornando apos destruturar, todo mundo tem acesso ao noteList,setNoteList, podendo modifica-los
}

/*

Nos componentes que precisam acessar ou modificar noteList, você pode simplesmente chamar useNoteList() 
para obter noteList atual e setNoteList para atualizar essa lista. Por exemplo, no componente NoteForm, 
você usa useNoteList() para acessar e modificar noteList conforme necessário.*/