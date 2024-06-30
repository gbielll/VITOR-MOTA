import React from 'react';
import "./styles.css";
import Logo from "../Logo";

export default function Header({children}){
    return (
    <header>
        {children} {/*ta chamando os filhos, tudo o que estiver dentro do compentes q estou enviando a props*/}
    </header>
    );
}