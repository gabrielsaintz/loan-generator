import { FormEvent, useState } from "react";

import { ConsultLoan } from "./components/consult/ConsultLoan";
import { Form } from "./components/form/Form";
import { Simulation } from "./components/simulation/Simulation";
import { api } from "./lib/api";

function App() {
	const [cpf, setCPF] = useState("");
	const [uf, setUF] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [loan, setLoan] = useState("");
	const [installment, setMonthlyPayment] = useState("");
	const [idLoan, setIdLoan] = useState("");

	const [loanInstallments, setloanInstallments] = useState<any>();
	const [tuition, setTuition] = useState<any>();
	const [loanInformation, setLoanInformation] = useState<any>();
	const [simulations, setSimulationData] = useState(false);
	const [consults, setConsults] = useState(false);

	const showSimulation = () => {
		if (simulations === false) {
			setSimulationData(!simulations);
		} else {
			setSimulationData(simulations);
		}
	};

	const showConsults = () => {
		if (consults === false) {
			setConsults(!consults);
		} else {
			setConsults(consults);
		}
	};

	const hiddenConsults = () => {
		setConsults(!consults);
		setloanInstallments(null);
	};

	const loanSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await api
			.post("/createloan", {
				data: {
					loanInformation,
					tuition,
				},
			})
			.catch(() => {
				window.alert("erro");
			});

		setSimulationData(!simulations);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await api
			.get("/simulation", {
				params: {
					cpf,
					birthDate,
					uf,
					loan,
					installment,
				},
			})
			.then((response) => {
				setTuition(response.data[0]);
				setLoanInformation(response.data[1]);
			})
			.catch(() => {
				window.alert(`
Um dos campos é Inválido, verifique:
-Valor minimo empréstimo: R$50.000,00
-Valor mínimo parcela: 1% do valor do empréstimo
-Taxa de juros inválida defina um Estado: MG: 1%, SP:0.8%, RJ:0.9%, ES:1.11% `);
			});

		return showSimulation();
	};

	const consultLoans = async (e: FormEvent) => {
		e.preventDefault();

		setloanInstallments(null);

		await api
			.get("/consult", {
				params: {
					idLoan,
				},
			})
			.then((response) => {
				setloanInstallments(response.data);
			})
			.catch(() => {
				window.alert(`
ID inválido`);
			});
	};

	const simulation = !simulations ? (
		""
	) : (
		<Simulation
			loanSubmit={loanSubmit}
			loanInformation={loanInformation}
			rows={tuition}
		/>
	);

	const consult = !consults ? (
		""
	) : (
		<ConsultLoan
			rows={loanInstallments}
			setIdLoan={setIdLoan}
			closeDialog={hiddenConsults}
			consultLoan={consultLoans}
		/>
	);

	return (
		<div className="container">
			<h1>Simule e solicite o seu empréstimo.</h1>
			<h2>Preencha o formulário abaixo para simular</h2>

			<Form
				setCpf={setCPF}
				setUf={setUF}
				setBirthDate={setBirthDate}
				setLoan={setLoan}
				setMonthlyPayment={setMonthlyPayment}
				handleSubmit={handleSubmit}
			/>

			{simulation}
		</div>
	);
}

export default App;
