import React, { useState, useRef } from 'react';
import { BsPersonAdd, BsTrash } from 'react-icons/bs';
import { RxReset } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const StepOnePage = () => {
  const [inputBoxes, setInputBoxes] = useState([{ id: 1, userNm: '' }]);
  const [invalidInputs, setInvalidInputs] = useState([]);
  const nextButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleAddInputBox = () => {
    const newId = inputBoxes.length + 1;
    setInputBoxes([...inputBoxes, { id: newId, userNm: '' }]);
  };

  const handleInputChange = (id, event) => {
    const newInputBoxes = inputBoxes.map((box) =>
      box.id === id ? { ...box, userNm: event.target.value } : box
    );
    setInputBoxes(newInputBoxes);
  };

  const handleRemoveInputBox = (id) => {
    const updatedInputBoxes = inputBoxes.filter((box) => box.id !== id);
    setInputBoxes(updatedInputBoxes);
  };

  const handleReset = () => {
    setInputBoxes([{ id: 1, userNm: '', isValid: true }]);
    setInvalidInputs([]);
  };

  const isInputsValid = inputBoxes.every(
    (box) => box.userNm.length > 0 && box.userNm.length <= 10
  );

  const handleNextStep = () => {
    if (isInputsValid && inputBoxes.length > 0) {
      navigate('/StepTwo', { state: { inputBoxes } }); // inputBoxes를 props로 전달
    } else {
      const invalidInputIds = inputBoxes
        .filter((box) => box.userNm.length === 0 || box.userNm.length > 10)
        .map((box) => box.id);
      setInvalidInputs(invalidInputIds);

      if (invalidInputIds.length > 0 && nextButtonRef.current) {
        nextButtonRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>정산때리자</div>
      {inputBoxes.map((box) => (
        <div key={box.id} style={styles.inputContainer}>
          <input
            type='text'
            value={box.userNm}
            onChange={(event) => handleInputChange(box.id, event)}
            maxLength={10}
            style={{
              ...styles.input,
              border: invalidInputs.includes(box.id)
                ? '1px solid red'
                : '1px solid #ccc',
            }}
            required
          />
          <button
            onClick={() => handleRemoveInputBox(box.id)}
            style={styles.removeButton}
          >
            <BsTrash size={20}></BsTrash>
          </button>
        </div>
      ))}
      <div>
        <button onClick={handleAddInputBox} style={styles.buttonStyle}>
          <BsPersonAdd size={22}></BsPersonAdd>인원추가
        </button>
        <button onClick={handleReset} style={styles.buttonStyle}>
          <RxReset size={22}></RxReset>초기화
        </button>
      </div>
      <button
        onClick={handleNextStep}
        style={styles.nextButton}
        ref={nextButtonRef}
      >
        다음
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    paddingTop: '20px',
    backgroundColor: 'hsl(0,0%,100%)',
  },
  title: {
    margin: '20px',
    color: '#0c4276',
    fontSize: '2rem',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  removeButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    fontSize: '12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonStyle: {
    background: 'none',
    color: '#3498db',
    padding: '8px 15px',
    margin: '10px',
    border: '2px solid #3498db',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'color 0.3s ease, border-color 0.3s ease',
  },
  nextButton: {
    flex: 1,
    background: '#3498db',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background 0.3s ease',
    margin: '10px',
    width: '150px',
  },
};

export default StepOnePage;
