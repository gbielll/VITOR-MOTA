import React from "react";
import "./styles.css";
import { useHighlight } from "../../context/HighlightContext";
import { useNoteForm } from "../../context/NoteFormContext";
import { useNoteList } from "../../context/NoteListContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Note({ id, title, description, falha,etapa }) {
    const { highlight, setHighlight } = useHighlight();
    const { setVisibleForm } = useNoteForm();
    const { noteList } = useNoteList();

    function gerarPdf() {
        if (highlight) {
            noteList.map(async (note) => {
                if (note.id === highlight) {
                    const doc = new jsPDF();
                    let y = 10; // Start position for text
                    doc.text(`Nome do Material: ${note.title}`, 10, y);
                    y += 10; // Move down for the next line
                    doc.text(`Descrição do Material: ${note.description}`, 10, y);
                    y += 10; // Move down for the next line
                    doc.text(`Falha do Material: ${note.falha}`, 10, y);
                    y += 10; // Move down for the next line
                    doc.text(`Etapa do Material: ${note.etapa}`, 10, y);
                    doc.save('Relatório.pdf');
                }
            });
        }
    }

    return (
        <div id={`note-${id}`} className={`note ${highlight === id && "highlight"}`}
             onClick={() => {
                if (highlight === id) {
                    setHighlight(false);
                    setVisibleForm(false);
                } else {
                   setHighlight(id);
                   setVisibleForm(true);
                }
            }}
         >
            <h2 className="title">{title}</h2>
            <hr />
            <h2 className="title">Tipo de Material</h2>
            <p className="notes-description">{description}</p>
            <h2 className="title">Falha do material</h2>
            <p className="notes-description">{falha}</p>
            <h2 className="title">Etapa</h2>
            <p className="notes-description">{etapa}</p>

           <hr/>
             {etapa === "Distribuição" && (
             <button onClick={gerarPdf}>Emitir Relatório</button>
             )}
        </div>
    );
}
