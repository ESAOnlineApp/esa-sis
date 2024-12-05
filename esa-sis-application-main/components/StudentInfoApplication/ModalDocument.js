/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: components\StudentInfoApplication\ModalDocument.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import { BsFillCloudArrowDownFill } from "react-icons/bs";

// import { Link } from '@mui/material';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ProfileModal({ closeModal, profileUrl, docUrl }) {
  return (
    <>
      {docUrl && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <a
              width="400"
              height="400"
              className="w-full h-auto  cursor-pointer"
              href={`${docUrl}`}
            >
              {docUrl}
            </a>
          </div>
        </div>
      )}
      {profileUrl && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {/* <div style={{width: '400px', height: '400px', position: 'relative'}}> */}
            <Image
              src={profileUrl}
              alt="Modal image"
              width="400"
              height="400"
              className="w-full h-auto"
            />
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
}

function CVModal({ closeModal, docUrl }) {
  return (
    <>
      {docUrl && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex justify-between p-6">
              <a href={docUrl} download>
                <BsFillCloudArrowDownFill className="w-10 h-10 bg-primary" />
              </a>
              <button className="modal-close " onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {docUrl.endsWith(".pdf") ? (
              <div style={{ maxWidth: "800px", maxHeight: "500px" }}>
                <Document
                  file={docUrl}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading ....</a>}
                >
                  <Page
                    pageNumber={1}
                    scale={1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <>
                <Image
                  src={docUrl}
                  alt="Modal image"
                  width="600"
                  height="600"
                  className="w-full h-auto"
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PassportModal({ closeModal, docPassportUrl }) {
  return (
    <>
      {docPassportUrl && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {docPassportUrl.endsWith(".pdf") ? (
              <div style={{ maxWidth: "600px", maxHeight: "600px" }}>
                <Document
                  file={docPassportUrl}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading Passport...</a>}
                >
                  <Page
                    wrap
                    pageNumber={1}
                    scale={0.5}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <Image
                src={docPassportUrl}
                alt="Modal image"
                width="600"
                height="600"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function RecommandationModal({ closeModal, docRecommandationLetterUrl }) {
  return (
    <>
      {docRecommandationLetterUrl && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {docRecommandationLetterUrl.endsWith(".pdf") ? (
              <div style={{ maxWidth: "800px", maxHeight: "800px" }}>
                <Document
                  file={docRecommandationLetterUrl}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading Recommandation Letter...</a>}
                >
                  <Page
                    wrap
                    pageNumber={1}
                    scale={1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <Image
                src={docRecommandationLetterUrl}
                alt="Modal image"
                width="600"
                height="600"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ProofOfM1Modal({ closeModal, docProofOfM1Url }) {
  return (
    <>
      {docProofOfM1Url && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {docProofOfM1Url.endsWith(".pdf") ? (
              <div style={{ maxWidth: "500px", maxHeight: "500px" }}>
                <Document
                  file={docProofOfM1Url}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading ProofOfM1...</a>}
                >
                  <Page
                    wrap
                    pageNumber={1}
                    scale={0.5}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <Image
                src={docProofOfM1Url}
                alt="Modal image"
                width="600"
                height="600"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function BACCertificateModal({ closeModal, docBACCertificateUrl }) {
  return (
    <>
      {docBACCertificateUrl && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {docBACCertificateUrl.endsWith(".pdf") ? (
              <div style={{ maxWidth: "600px", maxHeight: "600px" }}>
                <Document
                  file={docBACCertificateUrl}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading BACCertificate...</a>}
                >
                  <Page
                    wrap
                    pageNumber={1}
                    scale={0.5}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <Image
                src={docBACCertificateUrl}
                alt="Modal image"
                width="600"
                height="600"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function TranscriptModal({ closeModal, docTranscriptUrl }) {
  return (
    <>
      {docTranscriptUrl && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {docTranscriptUrl.endsWith(".pdf") ? (
              <div style={{ maxWidth: "600px", maxHeight: "600px" }}>
                <Document
                  file={docTranscriptUrl}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading Transcript...</a>}
                >
                  <Page
                    wrap
                    pageNumber={1}
                    scale={0.5}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <Image
                src={docTranscriptUrl}
                alt="Modal image"
                width="600"
                height="600"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ResearchModal({ closeModal, docResearchUrl }) {
  return (
    <>
      {docResearchUrl && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {docResearchUrl.endsWith(".pdf") ? (
              <div style={{ maxWidth: "600px", maxHeight: "600px" }}>
                <Document
                  file={docResearchUrl}
                  renderMode="canvas"
                  // onLoadSuccess={() => // console.log('PDF rendered successfully')}
                  onLoadError={(error) => console.error(error)}
                  loading={<a>Loading Research...</a>}
                >
                  <Page
                    wrap
                    pageNumber={1}
                    scale={0.5}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderInteractiveForms={false}
                  />
                </Document>
              </div>
            ) : (
              <Image
                src={docResearchUrl}
                alt="Modal image"
                width="600"
                height="600"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export {
  ProfileModal,
  CVModal,
  PassportModal,
  RecommandationModal,
  ProofOfM1Modal,
  BACCertificateModal,
  TranscriptModal,
  ResearchModal,
};
