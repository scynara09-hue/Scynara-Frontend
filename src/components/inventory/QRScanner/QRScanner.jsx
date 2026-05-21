import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { enviarQR } from "../../../services/qrService";
import "./QRScanner.css";

const QRScanner = () => {
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    let lastScan = "";

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            if (decodedText !== lastScan) {
              lastScan = decodedText;

              setResultado(decodedText);

              try {
                await enviarQR(decodedText);
              } catch (error) {
                console.error(error);
              }
            }
          }
        );

        isRunningRef.current = true;
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current && isRunningRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="scanner-container">
      <h1>📷 Escanear Producto</h1>

      <div className="scanner-box">
        <div id="reader"></div>
        <div className="scanner-overlay"></div>
      </div>

      {resultado && (
        <div className="resultado-card">
          <h3>Resultado</h3>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;