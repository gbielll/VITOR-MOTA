import React , {useEffect} from "react"
import "./styles.css";
import Note from "../Note"; // Caminho corrigido
import { useNoteList } from "../../context/NoteListContext";
import { useHighlight } from "../../context/HighlightContext";
import { useNoteForm } from "../../context/NoteFormContext";

export default function Notes() {

    const {noteList,setNoteList} = useNoteList(); /*como sao filhos, eles podem acessar essas componentes, que foram criado na função*/
    const {highlight,setHighlight} = useHighlight();
    const {setTitle,setDescription,setFalha,setEtapa} = useNoteForm();

    useEffect(()=>{
      getLocalNotes();
    },[]) //quando passa o array vazio, so executa a função a cima uma vez (que é isos que queremos, quando carregarmos a pagina pela 1 vez)


    //mudar as informações da caixa do form, ddecorrent a nota q vc clica 
    useEffect(()=>{
        if(highlight){
            //se tiver highlight, vai prenecher os campos do form com a note q tiver com o highlight clicaldo (id dele)
            const highlightNote = noteList.find((note)=>note.id===highlight) //buscar a nota caso haja hilight
            setTitle(highlightNote.title) //titile e description decorrente do highting q tenha o mesmo id
            setDescription(highlightNote.description)   
            setFalha(highlightNote.falha)
            setEtapa(highlightNote.etapa)
        }else{ //se n houver highlitgh
             setTitle(""); //vai ta modificando no useNoteform (na caixa do formuário)
             setDescription("");
             setFalha("");
             setEtapa("");
        }
    },[highlight] //decorrente desse valor do highlith, vai ta enviando a função a cima. ele monitora esse higtlith
)

 //PEGAR AS NOTAS LOCAIS, POIS FORAM SALVAR APENAS NO LOCALHOST COM O PARAMETRO "NOTES"
function getLocalNotes(){
    //pegar o JSON salvo no localhost
    let localNotes = localStorage.getItem("notes") //puxo o paremtro crido no  localStorage.setItem("notes",JSON.stringify(noteList)) atraves do parametro "notes" e salvo no "localNotes"

    if(localNotes ===null){ //se n houver valor, vamos adcionar nem que seja um array null nele
        localStorage.setItem("notes", JSON.stringify([]))// isso para sempre ter um array salvo no localhost, mesmo vazio. pq de primeira ele (no local host, atrves do parametro "notes")é vazio, na primeira vez que carregar a pagina. logo depois disso ele ja entra no else
    }else{ //se houver valor, ou ate vazio
        localNotes = JSON.parse(localNotes) //esse 'parse' faz o caminho oposto do stringify([]) (que transforma em string js), ja aqui retorna o que era, se era um obj volta a ser obj
                                           //com isso ele retorno ao localNotes
        setNoteList (localNotes) // aqui as notas são exibidas na telas com o valor do localNotes, que tem no localHost, vou novamente setar o array de notas no setnotelist                                  
                                //so que atraves agora do local host, pois os dados foram salvos no localHost( meio que estou sentando no setNoteList um banco de dados criado no localHost)
    }                     
}

    return (
        <section className="notes">
           {noteList.map((note)=>{ //essa note ta recebendo a lista de array do NoteList, o map é uma funçao que pecorre o array
              return( //tem q retornar para redenrizar
                <Note //estou passando essas informações como propos para NOTE
                key={note.id} //A key é usada pelo React para identificar de forma exclusiva cada elemento em uma lista de elementos.
                id ={note.id} //O id é uma prop que você pode definir e usar para qualquer propósito dentro do seu componente.
                title={note.title}
                falha = {note.falha}
                description={note.description}
                etapa = {note.etapa == 1
                    ? "Recebimento"
                    : note.etapa == 2
                    ? "Lavagem"
                    : note.etapa == 3
                    ? "Preparo"
                    : note.etapa == 4
                    ? "Distribuição"
                    : "Etapa desconhecida"}
                highlight={highlight} //ELE ACESSA PRIMEIRO COM O  const {highlight,setHighlight} = useHighlight(); E ENVIA 
                setHighlight={setHighlight}
               />
              );      
        })}
        </section>
    );
}