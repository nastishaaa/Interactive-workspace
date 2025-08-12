import React, { useState, useRef } from "react";
import s from './BitcoinPage.module.css'

export default function BitcoinPage() {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const wsRef = useRef(null);

    const start = () => {
        if (wsRef.current) return; 

        const ws = new WebSocket("wss://ws.blockchain.info/inv");

        ws.onopen = () => {
            console.log("Connected");
            ws.send(JSON.stringify({ op: "unconfirmed_sub" })); 
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.op === "utx") {
                const parsed = parseTransaction(data);

                setTransactions((prev) => [parsed, ...prev]);
                setTotal((prev) => prev + parsed.valueBTC);
            }
        };

        wsRef.current = ws;
    };

    const stop = () => {
        if (wsRef.current) {
            if (wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ op: "unconfirmed_unsub" }));
            }
            wsRef.current.close();
            wsRef.current = null;
        }
    }

    const reset = () => {
        setTransactions([]);
        setTotal(0);
    };

    const parseTransaction = (tx) => {
        const from = tx.x.inputs?.[0]?.prev_out?.addr || "Unknown";
        const to = tx.x.out?.[0]?.addr || "Unknown";
        const valueBTC = (tx.x.out?.[0]?.value || 0) / 100000000;
        return { from, to, valueBTC };
    };

    return (
        <div className="p-4">
            <div className={s.btnContainer}>
                <button className={s.btnStart} onClick={start}>Start</button>
                <button className={s.btnStop} onClick={stop}>Stop</button>
                <button className={s.btnReset} onClick={reset}>Reset</button>
            </div>

            <h2>Total: {total.toFixed(8)} BTC</h2>
            <div className={s.table}>
                <table border="1" cellPadding="4" >
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Sum (BTC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, i) => (
                            <tr key={i}>
                                <td>{tx.from}</td>
                                <td>{tx.to}</td>
                                <td>{tx.valueBTC.toFixed(8)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            
        </div>
    );
}
