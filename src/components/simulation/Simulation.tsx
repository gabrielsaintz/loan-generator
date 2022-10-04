import "./simulation.css";
import { Fragment } from "react";

interface props {
	loanSubmit: any;

	rows: {
		debtor: number;
		fees: number;
		adjustedDebtor: number;
		monthlyPayment: number;
		dueDate: string;
	}[];
	loanInformation: {
		cpf: string;
		birthDate: string;
		loan: string;
		percent: string;
		installmentValue: string;
		months: string;
		totalInterest: string;
		totalPayable: string;
	}[];
}

export function Simulation({ rows, loanInformation, loanSubmit }: props) {
	return (
		<div id="simulation">
			<h2>Veja a simulação para o seu empréstimo antes de efetivar</h2>
			<form className="box" onSubmit={loanSubmit}>
				{loanInformation?.map((val, key) => {
					return (
						<Fragment key={key}>
							<div className="simulationInfos">
								<p>VALOR REQUERIDO</p>
								<h3>{val.loan}</h3>
							</div>
							<div className="simulationInfos">
								<p>TAXA DE JUROS</p>
								<h3>{val.percent}% ao mês</h3>
							</div>
							<div className="simulationInfos">
								<p>VALOR DA PARCELA</p>
								<h3>{val.installmentValue}</h3>
							</div>
							<div className="simulationInfos">
								<p>TOTAL DE MESES</p>
								<h3>{val.months} Meses</h3>
							</div>
							<div className="simulationInfos">
								<p>TOTAL DE JUROS</p>
								<h3>{val.totalInterest}</h3>
							</div>
							<div className="simulationInfos">
								<p>TOTAL A PAGAR</p>
								<h3>{val.totalPayable}</h3>
							</div>
						</Fragment>
					);
				})}
				<div className="table">
					<p>PROJEÇÃO DAS PARCELAS:</p>
					<div>
						<table>
							<tr className="tableHeader">
								<th>Saldo devedor</th>
								<th>juros</th>
								<th>saldo devedor ajustado</th>
								<th>valor da parcela</th>
								<th>vencimento</th>
							</tr>
							{rows?.map((row, key) => (
								<tr key={key}>
									<th> {row.debtor}</th>
									<th> {row.fees}</th>
									<th> {row.adjustedDebtor}</th>
									<th> {row.monthlyPayment}</th>
									<th>{row.dueDate}</th>
								</tr>
							))}
						</table>
					</div>
				</div>

				<button className="button">
					EFETIVAR O EMPRÉSTIMO
					<img src="./src/assets/arrow-right.svg" alt="" />
				</button>
			</form>
		</div>
	);
}
