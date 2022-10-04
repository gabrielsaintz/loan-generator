import "./consult.css";

interface props {
	consultLoan: any;
	closeDialog: any;
	setIdLoan: Function;
	rows: {
		debtor: string;
		fees: string;
		adjustedDebtor: string;
		monthlyPayment: string;
		dueDate: string;
		idLoan: string;
	}[];
}

export function ConsultLoan({ consultLoan, closeDialog, setIdLoan, rows }: props) {
	return (
		<div className="body">
			<div className="consult">
				<a onClick={closeDialog}>x</a>
				<h2>Digite o id do empréstimo: </h2>
				<div>
					<input type="text" onChange={(e) => setIdLoan(e.target.value)} />
					<button onClick={consultLoan}>buscar emprestimo</button>
				</div>
				<h2>Parcelas do empréstimo </h2>
				<div>
					<table>
						<tr className="tableHeader">
							<th>Saldo devedor</th>
							<th>juros</th>
							<th>saldo devedor ajustado</th>
							<th>valor da parcela</th>
							<th>vencimento</th>
							<th>id</th>
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
		</div>
	);
}
