import { useState } from "react";
export default function Bahan() {
  let dataBahan = JSON.parse(localStorage.getItem("dataBahan"));
  return (
    <div className="container bahan">
      <h5 className="text-center">Kandungan Bahan</h5>
      <table className="table">
        <thead className="position-sticky top-0 bg-secondary">
          <tr>
            <th style={{ width: "10vw" }}>Nama</th>
            <th style={{ width: "5vw" }}>BK</th>
            <th style={{ width: "5vw" }}>PK</th>
            <th style={{ width: "5vw" }}>LK</th>
            <th style={{ width: "5vw" }}>Abu</th>
            <th style={{ width: "5vw" }}>Ca</th>
            <th style={{ width: "5vw" }}>P</th>
            <th style={{ width: "5vw" }}>TDN</th>
          </tr>
        </thead>
        <tbody>
          {dataBahan.map((e, i) => {
            return (
              <tr key={i}>
                {Object.keys(e).map(f=>{
                if(f!="ndf"&&f!="id")return <td key={f}>{e[f]}</td>}
              )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
