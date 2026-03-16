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
          <h2 className="product-import-title">Tai tep du lieu len he thong</h2>
          <button type="button" className="sale-btn product-import-check">
            Kiem tra du lieu
          </button>
        </div>

        <div className="product-import-body">
          <aside className="product-import-steps">
            <h3 className="product-import-step-heading">Buoc 1. Chon tep nguon</h3>
            <div className="product-import-step active">1. Chon tep nguon</div>
            <div className="product-import-step">2. Kiem tra du lieu</div>
            <div className="product-import-step">3. Tai len he thong</div>
          </aside>

          <div className="product-import-content">
            <label className="product-import-dropzone">
              <input
                className="product-import-input"
                type="file"
                accept=".xls,.xlsx"
                onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? "")}
              />
              <div className="product-import-drop-title">Chon hoac tha tep du lieu vao day</div>
              <div className="product-import-drop-note">(Dinh dang file xls, xlsx va co toi da 3000 dong)</div>
              <span className="product-import-select">Chon file</span>
              {selectedFile ? <div className="product-import-file">Da chon: {selectedFile}</div> : null}
            </label>

            <div className="product-import-help">
              <div className="product-import-help-title">Neu chua co tep mau de chuan bi du lieu ?</div>
              <div className="product-import-help-line">
                1. Tai tep du lieu mau (excel) ma phan mem cung cap de chuan bi du lieu{" "}
                <span className="product-import-link">Tai day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
