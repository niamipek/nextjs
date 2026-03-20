"use client";

type ImportModalProps = {
  open: boolean;
  selectedFile: string;
  onClose: () => void;
  onFileChange: (fileName: string) => void;
};

export function ImportModal({ open, selectedFile, onClose, onFileChange }: ImportModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="product-import-overlay" role="dialog" aria-modal="true">
      <div className="product-import-modal">
        <div className="product-import-header">
          <button type="button" className="product-import-close" onClick={onClose}>
            X
          </button>
          <h2 className="product-import-title">Upload data file to the system</h2>
          <button type="button" className="sale-btn product-import-check">
            Validate data
          </button>
        </div>

        <div className="product-import-body">
          <aside className="product-import-steps">
            <h3 className="product-import-step-heading">Step 1. Choose source file</h3>
            <div className="product-import-step active">1. Choose source file</div>
            <div className="product-import-step">2. Validate data</div>
            <div className="product-import-step">3. Upload to system</div>
          </aside>

          <div className="product-import-content">
            <label className="product-import-dropzone">
              <input
                className="product-import-input"
                type="file"
                accept=".xls,.xlsx"
                onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? "")}
              />
              <div className="product-import-drop-title">Choose or drag a data file here</div>
              <div className="product-import-drop-note">(Supports xls, xlsx files with up to 3000 rows)</div>
              <span className="product-import-select">Choose file</span>
              {selectedFile ? <div className="product-import-file">Selected: {selectedFile}</div> : null}
            </label>

            <div className="product-import-help">
              <div className="product-import-help-title">Need a template file to prepare your data?</div>
              <div className="product-import-help-line">
                1. Download the sample Excel file provided by the system to prepare your data{" "}
                <span className="product-import-link">here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
