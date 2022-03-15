import React, { useEffect } from "react";
import "./MultiSelect.css";

const ClearIcon = (props) => {
  return (
    <svg
      height="14"
      width="14"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      class="clear-icon"
    >
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

export const defaultDenderer = (props) => {
  return (
    <div className="multi-select-item">
      <div className="item-text">{props.item.label} </div>
      <div
        className={`item-clear-icon ${props.item.error ? "error" : ""}`}
        onClick={() => props.removeOption(props.item)}
      >
        <ClearIcon />
      </div>
    </div>
  );
};

function MultiSelect(props) {
  const [inputText, setInputText] = React.useState("");
  const { options, onChange, value = [], rederer = defaultDenderer } = props;
  const [showOptions, setShowOptions] = React.useState(false);
  const [filteredOptions, setFilteredOptions] = React.useState([]);
  const inputRef = React.useRef(null);

  useEffect(() => {
    filterOptionsOnValues();
  }, [options, value, inputText]);

  const filterOptionsOnValues = () => {
    const valuesTexts = value.map((item) => item.label);
    let shownOptions = options.filter(
      (option) => valuesTexts.indexOf(option.label) === -1
    );
    if (inputText) {
      shownOptions = shownOptions.filter((option) =>
        option.label.includes(inputText)
      );
    }
    setFilteredOptions(shownOptions);
  };

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onInputKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      if (!inputText) {
        filterOptionsOnValues();
      }
      const selectedOption = filteredOptions.find(
        (option) => option.label.toLowerCase() === inputText
      );
      if (selectedOption) {
        onChange([...value, selectedOption]);
        setInputText("");
      } else {
        if (inputText) {
          selectOption({ label: inputText });
          setInputText("");
        } else {
          focusInput();
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
    setShowOptions(true);
  };

  const selectOption = (option) => {
    const newValue = [...value, option];
    onChange(newValue, option);
    setInputText("");
    setShowOptions(false);
  };

  const removeOption = (option) => {
    const newValue = value.filter((item) => item.label !== option.label);
    onChange(newValue, option);
  };

  return (
    <>
      <div className="multi-select-wrapper" onClick={focusInput}>
        <div className="multi-select-wrapper-inner">
          {value.map((item) => rederer({ item, removeOption }))}
          <div data-value={inputText} className="select-input-value">
            <input
              ref={inputRef}
              className="select-input"
              value={inputText}
              onKeyDown={onInputKeyDown}
              onChange={onInputChange}
            />
          </div>
          <div className="default-actions"></div>
        </div>
      </div>
      {showOptions && (
        <div className="multi-select-options">
          <ul className="select-option-ul">
            {filteredOptions.map((item) => (
              <li
                className="select-option-li"
                onClick={() => {
                  selectOption(item);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MultiSelect;
