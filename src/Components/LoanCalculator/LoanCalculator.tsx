import React, { useEffect, useState } from "react";

export default function LoanCalculator() {
    const [downPayment, setDownPayment] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [interestRate, setInterestRate] = useState(0);

    useEffect(() => {
        console.clear();
        console.log("Down Payment", downPayment);
        console.log("Loan Term", loanTerm);
        console.log("Interest Rate", interestRate);
    }, [downPayment, loanTerm, interestRate]);

    return (
        <div>
            <input
                type="range"
                onChange={(event) =>
                    setDownPayment(parseInt(event.target.value))
                }
                min={1}
                max={400}
                step={1}
                value={downPayment}
                className="custom-slider"
            />
            <input
                type="range"
                onChange={(event) => setLoanTerm(parseInt(event.target.value))}
                min={1}
                max={400}
                step={1}
                value={loanTerm}
                className="custom-slider"
            />
            <input
                type="range"
                onChange={(event) =>
                    setInterestRate(parseInt(event.target.value))
                }
                min={1}
                max={400}
                step={1}
                value={interestRate}
                className="custom-slider"
            />
        </div>
    );
}
