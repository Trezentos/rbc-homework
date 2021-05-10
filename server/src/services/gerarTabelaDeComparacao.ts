interface IProcessadores {
    [index: string]: string;
}

export default function gerarTabelaDeComparacao(processadores: any, pesoParametro: number) {
    const PESO = 1 + pesoParametro;
    
    let tabela = new Array(processadores.length);


    for(let i=0; i<tabela.length; i++) {
        tabela[processadores[i]] = new Array(processadores.length);
    }


    for(let i=0; i<tabela.length; i++) {
        for(let j=0; j<tabela.length; j++) { 
            tabela[processadores[i]][processadores[j]] = 0   
            
            if ( i == j ) {
                tabela[processadores[i]][processadores[j]] = 1;
            }
        }
    }

    for(let i=0; i<tabela.length; i++) {
        let peso = PESO
        tabela[processadores[i]][processadores[i]]

        for(let coluna=i; coluna<processadores.length; coluna++){
            tabela[processadores[i]][processadores[coluna]] = peso = subtrairPeso(peso, pesoParametro);
        }
        peso = PESO;

        for(let coluna=i; coluna>=0; coluna--){
            tabela[processadores[i]][processadores[coluna]] = peso = subtrairPeso(peso, pesoParametro);
        }
    }

    return tabela as IProcessadores[];

}


function subtrairPeso(n:number, pesoParam:number) {
    let number = Number(Number(n-= pesoParam).toFixed(1))

    return (number > 0)? number : 0
}



