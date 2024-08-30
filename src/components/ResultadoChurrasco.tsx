import { useLocation, useNavigate } from "react-router-dom";
import { Alimento, nomesAlimentos, quantidadePessoas } from "../types";
import styles from "./ResultadoChurrasco.module.css";

type ResultadoChurrasco = {
  pessoas: number;
  alimentosSelecionados: Alimento[];
};

const ResultadoChurrasco = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ResultadoChurrasco;

  const totalPorAlimento = state.alimentosSelecionados.reduce(
      (valorAcumulado, alimento) => {
      valorAcumulado[alimento] = (quantidadePessoas[alimento] * state.pessoas) / 1000;
      return valorAcumulado;
    },
    {} as Record<Alimento, number>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultado para {state.pessoas} pessoas.</h2>
      {state.alimentosSelecionados.map((alimento) => (
        <p key={alimento} className={styles.resultText}>
          {nomesAlimentos[alimento]}: {totalPorAlimento[alimento]} kg.
        </p>
      ))}
      <button 
        onClick={() => {navigate("/")}}
        className={styles.resetButton}
      >
        Reiniciar
      </button>
    </div>
  )
};

export default ResultadoChurrasco;