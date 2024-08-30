import { useLocation, useNavigate } from "react-router-dom";
import { Alimento, nomesAlimentos, quantidadePessoas } from "../types";

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
    <div>
      <h2>Resultado para {state.pessoas} pessoas.</h2>
      {state.alimentosSelecionados.map((alimento) => (
        <p key={alimento}>{nomesAlimentos[alimento]}: {totalPorAlimento[alimento]} kg</p>
      ))}
      <button onClick={() => {navigate("/")}}>Reiniciar</button>
    </div>
  )
};

export default ResultadoChurrasco;