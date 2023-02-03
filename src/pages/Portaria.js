import React, {useState} from 'react';
import styles from './Portaria.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Portaria() {
    const numero = require('numero-por-extenso');
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    function gerarPDF(event) {
        html2canvas(document.getElementById('screenA4'), {
            scale: 3
        })
        .then(function(canvas){
            canvas.id = "canvasID";
            document.body.appendChild(canvas);
        });
        setTimeout(function() {
            doc.addImage(document.getElementById("canvasID"), 'png', 0, 0, width, height);
            doc.save(
                "PORTARIA " +
                numeroPortaria + " " +
                diaPortaria + " " +
                mesPortaria + " " +
                anoDocumentoPortaria +
                " DIARIA " +
                nome +
                ".pdf"
            );
            event.preventDefault();
            window.location.reload();
        }, 1200);
        
    }

    const meses = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ];

    const [numeroPortaria, setNumeroPortaria] = useState('');
    const [diaPortaria, setDiaPortaria] = useState('');
    const [mesPortaria, setMesPortaria] = useState('');
    const [anoDocumentoPortaria, setAnoDocumentoPortaria] = useState('');
    const [diarias, setDiarias] = useState('');
    const [diariasExtenso, setDiariasExtenso] = useState('');
    const [tipoDiaria, setTipoDiaria] = useState('');
    const [tratamentoA_AO, setTratamentoA_AO] = useState('');
    const [tratamentoPessoa, setTratamentoPessoa] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [destino, setDestino] = useState('');
    const [singularPluralDiasViagem, setSingularPluralDiasViagem] = useState('');
    const [diaViagem, setDiaViagem] = useState('');
    const [mesViagem, setMesViagem] = useState('');
    const [anoViagem, setAnoViagem] = useState('');
    const [dataSegundaViagem, setDataSegundaViagem] = useState('');
    const [orgaoDeInteresse, setOrgaoDeInteresse] = useState('');
    const [valorDiaria, setValorDiaria] = useState('');
    const [dataRodape, setDataRodape] = useState('');
    const [temporalViagem, setTemporalViagem] = useState('');

    return(
        <body className={styles.page}>
            <div>
                <form>
                    <label>Número da Portaria:</label>
                    <div>
                        <input type="text" onChange={
                            (event) => {
                                setNumeroPortaria(event.target.value);
                            }
                        }/>
                    </div>
                    <label>Data da Portaria:</label>
                    <input type="date" onChange={
                        (event) => {
                            let dia = event.target.value.substring(8,10);
                            let mes = meses[event.target.value.substring(5,7)-1].toUpperCase();
                            let ano = event.target.value.substring(0,4);
                            setDiaPortaria(dia);
                            setMesPortaria(mes);
                            setAnoDocumentoPortaria(ano);

                            if(dia === "01") {
                                setDataRodape(
                                    " a " + dia +
                                    " dia do mês de " + mes.toLowerCase() +
                                    " de " + ano
                                );
                            } else {
                                setDataRodape(
                                    " aos " + dia +
                                    " dias do mês de " + mes.toLowerCase() +
                                    " de " + ano
                                );
                            }
                        }
                    }/>
                    <label>Número de diárias:</label>
                    <select type="number" onChange={
                        (event) => {
                            setDiarias(event.target.value);
                            if (event.target.value === "1") {
                                setDiariasExtenso("uma");
                                setSingularPluralDiasViagem("no dia:");
                                setDataSegundaViagem("");
                            } else {
                                if (event.target.value === "2") {
                                    setDiariasExtenso("duas");
                                    setSingularPluralDiasViagem("nos dias:");
                                    setDataSegundaViagem("");
                                }
                            }
                        }
                    }>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <label>Tipo de diária:</label>
                    <select name="tipo-diaria" onChange={
                        (event) => {
                            setTipoDiaria(event.target.value);
                        }
                    }>
                        {diarias > 1 &&
                            <>
                                <option value=""></option>
                                <option value="meia diárias">meia diárias</option>
                                <option value="diárias">diárias</option>
                            </>
                        }
                        {diarias === "1" &&
                            <>
                                <option value=""></option>
                                <option value="meia diária">meia diária</option>
                                <option value="diária">diária</option>
                            </>
                        }
                    </select>
                    <label>Nome e tratamento:</label>
                    <div>
                        <select name="tratamentoPessoa" onChange={
                            (event) => {
                                if (event.target.value === "Sr.") {
                                    setTratamentoA_AO("ao");
                                } else {
                                    setTratamentoA_AO("a");
                                }
                                setTratamentoPessoa(event.target.value);
                            }
                        }>
                            <option value=""></option>
                            <option value="Sr.">Sr.</option>
                            <option value="Sra.">Sra.</option>
                        </select>
                        <input type="text" onChange={
                            (event) => {
                                setNome(event.target.value.toUpperCase());
                            }
                        }/>
                    </div>
                    <label>Cargo:</label>
                    <input type="text" onChange={
                        (event) => {
                            setCargo(event.target.value);
                        }
                    }/>
                    <label>Temporal da Viagem:</label>
                    <select name="temporal" onClick={
                        (event) => {
                            setTemporalViagem(event.target.value);
                        }
                    }>
                        <option value=""></option>
                        <option value=" em virtude de uma viagem realizada ">Em virtude (singular)</option>
                        <option value=" que dispôs a realizar uma viagem ">Dispôs (singular)</option>
                        <option value=" que dispõe a realizar uma viagem ">Dispõe (singular)</option>
                        <option value=" em virtude das viagens realizadas ">Em virtude (plural)</option>
                        <option value=" que dispôs a realizar viagens ">Dispôs (plural)</option>
                        <option value=" que dispõe a realizar viagens ">Dispõe (plural)</option>
                    </select>
                    <label>Destino:</label>
                    <select name="destino" onClick={
                        (event) => {
                            setDestino(event.target.value);
                        }
                    }>
                        <option value=""></option>
                        <option value=" Goiânia-GO">Goiânia-GO</option>
                        <option value=" Trindade-GO">Trindade-GO</option>
                        <option value=" Palmeiras de Goiás">Palmeiras de Goiás</option>
                        <option value=" Cezarina-GO">Cezarina-GO</option>
                        <option value=" Indiara-GO">Indiara-GO</option>
                        <option value=" Abadia de Goiás">Abadia de Goiás</option>
                        <option value=" Anápolis-GO">Anápolis-GO</option>
                        <option value=" Guapó-GO">Guapó-GO</option>
                    </select>
                    <label>Dia de diária:</label>
                    {diarias === "" &&
                        <input type="date" disabled/>
                    }
                    {diarias === "1" &&
                        <input type="date" onChange={
                            (event) => {
                                setDiaViagem(event.target.value.substring(8,10));
                                setMesViagem(meses[event.target.value.substring(5,7)-1].toLowerCase());
                                setAnoViagem(event.target.value.substring(0,4));
                            }
                        }/>
                    }
                    {diarias === "2" &&
                        <>
                            <input type="date" onChange={
                                (event) => {
                                    setDiaViagem(event.target.value.substring(8,10));
                                    setMesViagem(meses[event.target.value.substring(5,7)-1].toLowerCase());
                                    setAnoViagem(event.target.value.substring(0,4));
                                }
                            }/>
                            <input type="date" onChange={
                                (event) => {
                                    setDataSegundaViagem(
                                        " e " + event.target.value.substring(8,10) +
                                        " de " + meses[event.target.value.substring(5,7)-1].toLowerCase() +
                                        " de " + event.target.value.substring(0,4)
                                    );
                                }
                            }/>
                        </>
                    }
                    <label>Orgão de interesse:</label>
                    <select name="orgao" onClick={
                        (event) => {
                            setOrgaoDeInteresse(event.target.value);
                        }
                    }>
                        <option value=""></option>
                        <option value=" Prefeitura Municipal de Varjão">Prefeitura Municipal de Varjão</option>
                        <option value=" Secretaria Municipal de Saúde">Secretaria Municipal de Saúde</option>
                        <option value=" Secretaria Municipal de Assistência Social">Secretaria Municipal de Assistência Social</option>
                        <option value=" Secretaria Municipal de Educação e Cultura">Secretaria Municipal de Educação e Cultura</option>
                        <option value=" Secretaria Municipal de Meio Ambiente e Turismo">Secretaria Municipal de Meio Ambiente e Turismo</option>
                    </select>
                    <label>Valor da diária:</label>
                    <input type="number" onChange={
                        (event) => {
                            setValorDiaria(event.target.value);
                        }
                    }/>
                    <button type="button" onClick={
                        (event)=> {
                            gerarPDF(event);
                        }
                    }>
                        Download PDF
                    </button>
                </form>
            </div>


            <div>
                <div id="screenA4" className={styles.a4}>
                    <p className={styles.portaria}>
                        PORTARIA N° {numeroPortaria}/{anoDocumentoPortaria}, DE {diaPortaria} DE {mesPortaria} DE {anoDocumentoPortaria}.
                    </p>
                    <p className={styles.subtitulo}>
                        “Concede diárias para viagens, e da outras <br/>providências”.
                    </p>
                    <div className={styles.corpoDoTexto}>
                        <p>
                            <strong>O PREFEITO MUNICIPAL DE VARJÃO</strong>, Estado de Goiás,
                            no uso de suas <br/>atribuições legais, e tendo em vista
                            o que dispõe o Decreto nº 82A /21 de 2 de fevereiro de 2021.
                            <br/>
                        </p>
                        <p>
                            <strong>RESOLVE:</strong>
                        </p>
                        <p>
                        <strong>Art. 1º.</strong> Determinar o pagamento de 0{diarias} ({diariasExtenso}) {tipoDiaria} {tratamentoA_AO}
                        <strong> {tratamentoPessoa} {nome}</strong>, ocupante do cargo de {cargo}, 
                            {temporalViagem} à cidade de {destino},&ensp;
                            {singularPluralDiasViagem} {diaViagem} de {mesViagem} de {anoViagem}{dataSegundaViagem}, para
                            tratar de assuntos do interesse da {orgaoDeInteresse}.
                            <br/>
                        </p>
                        <p>
                        <strong>Art. 2º.</strong> Em consequência, conceder-lhe 0{diarias} ({diariasExtenso}) {tipoDiaria}&ensp;
                            à razão de R$ {valorDiaria},00 ({numero.porExtenso(valorDiaria, numero.estilo.monetario)})
                            perfazendo um total de R$ {valorDiaria * parseInt(diarias)},00
                            ({numero.porExtenso(valorDiaria * diarias, numero.estilo.monetario)}), tendo
                            em vista as despesas com refeições a ser por conta do servidor acima mencionado.
                            <br/>
                        </p>
                        <p>
                        <strong>Art. 3º.</strong> As despesas decorrentes deste ato, correrão a conta de dotações
                            orçamentárias consignadas no Orçamento em Vigor.
                            <br/>
                        </p>
                        <p>
                        <strong>Art. 4º.</strong>  Esta portaria entrará em vigor a partir da data de sua publicação,
                            revogadas as disposições em contrario.
                            <br/>
                        </p>
                        <div className={styles.alignCenter}>
                            <p>
                                <br/><br/><br/>
                                <strong>PUBLIQUE-SE. DÊ-SE CIÊNCIA. CUMPRA-SE.</strong>
                            </p>
                            <p>
                                Gabinete do Prefeito Municipal de Varjão, {dataRodape}.
                            </p>
                            <p>
                                <br/><br/><br/>
                                ________________________________________________<br/>
                                <strong>Rafael Pereira Machado Franco</strong><br/>
                                <strong>Prefeito Municipal</strong><br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
export default Portaria;
