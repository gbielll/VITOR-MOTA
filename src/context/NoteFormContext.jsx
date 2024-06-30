import React, {useState,useContext, createContext} from "react";

const NoteFormContext = createContext();  /*essa variável chama a funcão createContext, o contexto posso especificar de maneira global*/

export default function NoteFormProvider({children}){

    const [visibleForm,setVisibleForm] = useState(false) 

    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[falha,setFalha] = useState("");
    const[etapa,setEtapa] = useState("");

    return( 
          
        /*provider = providenciar uma informação <HighlightContext.Provider value={(aqui eu passo as informações - o nome esse variável posso 
          acessar em outra componente: const mesmonome = useContext(Highlight)) */
        //esse highlight,setHighlight é do set la em cima
        <NoteFormContext.Provider value={{visibleForm,setVisibleForm,title,setTitle,description,setDescription,falha,setFalha,etapa,setEtapa}}> 
             {children}  {/*recebe esse childre direto na function acima e todas essa childre tem acesso a esses values
                           (ao useContext desse Highlight, por isso tem q ta dentro, mas para acessar tenho que  fazer isso

                            context = useContext(HighlightContext)
                            const {highlight,setHighlight}=context;

                            para deixar mais organizado, fiz a função a baixo com o retorno logo de cara. so consegue retonrar esse valores os filhoes 
                            do HighlightContext.provider, pois estao dentro dele
                            
                           */}       
        </NoteFormContext.Provider>
    )
}

export function useNoteForm(){
    const context = useContext(NoteFormContext)
    const {visibleForm,setVisibleForm,title,setTitle,description,setDescription,falha,setFalha,etapa,setEtapa}=context; //destruturar esse obj, pois ele recebe do useContext(HighlightContext), atrves do value o :highlight,setHighlight
    return {visibleForm,setVisibleForm,title,setTitle,description,setDescription,falha,setFalha,etapa,setEtapa}; //retornando apos destruturar
}