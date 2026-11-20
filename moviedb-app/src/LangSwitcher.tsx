import { useState } from "react";
import "./Dropdown.css";

type Props = {
  onLanguageChange: (label: string, code: string) => void;
};

export default function LanguageDropdown({ onLanguageChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English 🇺🇸");

  const handleSelect = (label: string, code: string) => {
    setSelectedLanguage(label);
    onLanguageChange(code, label);  // update App.tsx state
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={() => setOpen(prev => !prev)}>
        {selectedLanguage}
      </button>

      {open && (
        <div className="dropdown-content">
          <a href="#" onClick={(e) => { 
            e.preventDefault(); 
            handleSelect("English 🇺🇸", "en-US"); 
          }}>
            English 🇺🇸
          </a>

          <a href="#" onClick={(e) => { 
            e.preventDefault(); 
            handleSelect("German 🇩🇪", "de-DE"); 
          }}>
            German 🇩🇪
          </a>

          <a href="#" onClick={(e) => { 
            e.preventDefault(); 
            handleSelect("Swedish 🇸🇪", "sv-SE"); 
          }}>
            Swedish 🇸🇪
          </a>
        </div>
      )}
    </div>
  );
}
