import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./App.css";

const pdf = new jsPDF();

function App() {
  const qrCodeRef = useRef(null);

  const [downloadLink, setDownloadLink] = useState(null);
  const [qr, setQr] = useState("hi");

  const generateQRCode = (e) => {
    e.preventDefault();
    html2canvas(qrCodeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
	
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      setDownloadLink(imgData);
    });
  };

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<img src="' + downloadLink + '" />');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const downloadQRCode = () => {
      pdf.save("qrcode.pdf");
  };

  return (
    <div className="App">
      <div ref={qrCodeRef}>
        <QRCode value={qr} />
      </div>
      <form>
	<input type="text" value={qr} onChange={(e) => setQr(e.target.value)}/>
	<button onClick={generateQRCode}>Generate QR Code</button>
      </form>
      {downloadLink && (
        <div>
          <button
            onClick={downloadQRCode}
          >
            Download QR Code
          </button>
          <button onClick={printQRCode}>Print QR Code</button>
        </div>
      )}
    </div>
  );
}

export default App;
