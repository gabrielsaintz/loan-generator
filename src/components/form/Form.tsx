import { FormEventHandler, useState } from "react";
import "./form.css";

interface props {
	setCpf: Function;
	setUf: Function;
	setBirthDate: Function;
	setLoan: Function;
	setMonthlyPayment: Function;
	handleSubmit: FormEventHandler<HTMLFormElement>;
}

export function Form({ setCpf, setUf, setBirthDate, setLoan, setMonthlyPayment, handleSubmit }: props) {
	return (
		<div className="box">
			<form onSubmit={handleSubmit}>
				<input type="string" maxLength={11} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
				<select onChange={(e) => setUf(e.target.value)} placeholder="UF">
					<option value="">UF</option>
					<option value={1}>MG</option>
					<option value={0.8}>SP</option>
					<option value={0.9}>RJ</option>
					<option value={1.11}>ES</option>
				</select>
				<input type="date" onChange={(e) => setBirthDate(e.target.value)} placeholder="DATA DE NASCIMENTO" />
				<input
					type="Number"
					onChange={(e) => setLoan(e.target.value)}
					placeholder="QUAL VALOR DO EMPRÉSTIMO"
				/>
				<input
					type="Number"
					onChange={(e) => setMonthlyPayment(e.target.value)}
					placeholder="QUAL VALOR DESEJA PAGAR POR MÊS"
				/>

				<button>SIMULAR</button>
			</form>
		</div>
	);
}
