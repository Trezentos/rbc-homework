import gerarTabelaDeComparacao from './gerarTabelaDeComparacao';
const tabelaProcessadores = gerarTabelaDeComparacao(['Celeron', 'Pentium', 'I3', 'I5', 'I7', 'I9'], 0.3)
const tabelaMemoriasRam = gerarTabelaDeComparacao(['4GB', '8GB', '16GB', '32GB'], 0.4)
const tabelaDiscos = gerarTabelaDeComparacao(['200GB', '500GB', '1TB', '2TB'], 0.6)
const tabelaPlacaDeVideo = gerarTabelaDeComparacao(['Interna', 'GTX 1050', 'GTX 1650', 'RTX 2060', 'RTX 3080'], 0.4)
import db from '../db/firebase';


interface IPcComponents {
    processador: any;
    memoriaRam: any;
    disco: any;
    placaDeVideo: any;
}

interface AvailablePcs {
    processador: string,
    memoriaRam: string,
    disco: string,
    placaDeVideo: string,
    nome:string;
};



export default async function  procurarViaRBC({ processador, memoriaRam, disco, placaDeVideo }: IPcComponents): Promise<AvailablePcs[]> {
    const pcDisponiveis: any[] = [];

    console.table(tabelaProcessadores);

    const snapshot = await db.collection('computadores').get();
    
    snapshot.forEach((doc) => {
        const newPc = doc.data();
        pcDisponiveis.push({
            ...newPc,
            compatibilidade: 1,
        })
    });
    

    const compatibilidades = pcDisponiveis.map(pcDisponivel => {
        const multProcessador = Number(tabelaProcessadores[processador][pcDisponivel.processador]);
        const multMemoriaRam = Number(tabelaMemoriasRam[memoriaRam][pcDisponivel.memoriaRam]);
        const multDisco= Number(tabelaDiscos[disco][pcDisponivel.disco]);
        const multPlacaDeVideo= Number(tabelaPlacaDeVideo[placaDeVideo][pcDisponivel.placaDeVideo]); 
        const compatibilidade = Number((multProcessador*0.4 + multMemoriaRam*0.2 + multDisco*0.2 + multPlacaDeVideo*0.2).toFixed(2));

        return {
            ...pcDisponivel,
            compatibilidade,
        }
    }).sort((a,b)=>{
        return  b.compatibilidade - a.compatibilidade;
    })


    return compatibilidades;
    
}