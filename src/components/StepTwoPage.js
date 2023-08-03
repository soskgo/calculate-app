import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAddCard } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { RxReset } from 'react-icons/rx';

const StepTwoPage = () => {
  const [content, setContent] = useState([
    { id: 1, content: '', amount: '', isValid: true },
  ]);
  const { state } = useLocation();
  const { inputBoxes } = state;
  const nextButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleAddData = () => {
    const newContent = {
      id: content.length + 1,
      content: '',
      amount: '',
      isValid: true,
    };
    setContent([...content, newContent]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = content.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setContent(updatedData);
  };

  const isContentValid = (value) => value.trim() !== '';
  const isAmountValid = (value) => parseFloat(value) >= 0;

  const handleNextStep = () => {
    let isInputValid = true;
    const updatedContent = content.map((item) => {
      if (!isContentValid(item.content) || !isAmountValid(item.amount)) {
        isInputValid = false;
        return { ...item, isValid: false };
      }
      return { ...item, isValid: true };
    });

    setContent(updatedContent);

    if (isInputValid && content.length > 0) {
      navigate('/StepThree', { state: { inputBoxes, content } });
    } else {
      if (nextButtonRef.current) {
        nextButtonRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDeleteData = (id) => {
    const updatedContent = content.filter((item) => item.id !== id);
    setContent(updatedContent);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleReset = () => {
    setContent([{ id: 1, content: '', amount: '', isValid: true }]);
  };

  return (
    <div style={styles.container}>
      {content.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.sectionStyle,
            border: item.isValid === false ? '1px solid red' : '1px solid #ccc',
          }}
        >
          <label>내용</label>
          <div>
            <input
              type='text'
              value={item.content}
              onChange={(event) =>
                handleInputChange(item.id, 'content', event.target.value)
              }
              maxLength={10}
              required
              style={{
                ...styles.input,
              }}
            />
          </div>
          <label>금액</label>
          <div>
            <input
              type='number'
              value={item.amount}
              onChange={(event) =>
                handleInputChange(item.id, 'amount', event.target.value)
              }
              maxLength={10}
              required
              style={{
                ...styles.input,
              }}
            />
          </div>
          <button
            onClick={() => handleDeleteData(item.id)}
            style={styles.removeButton}
          >
            <BsTrash size={20}></BsTrash>
          </button>
        </div>
      ))}
      <div>
        <button onClick={handleAddData} style={styles.buttonStyle}>
          <MdAddCard size={20}></MdAddCard>정산내용추가
        </button>
        <button onClick={handleReset} style={styles.buttonStyle}>
          <RxReset size={22}></RxReset>초기화
        </button>
      </div>
      <div style={styles.moveBtnGroup}>
        <button onClick={handleGoBack} style={styles.nextButton}>
          이전
        </button>
        <button
          onClick={handleNextStep}
          style={styles.nextButton}
          ref={nextButtonRef}
        >
          다음
        </button>
      </div>
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
  sectionStyle: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    width: '100%',
    margin: '10px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '99%',
    marginBottom: '10px',
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
  moveBtnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    marginTop: '20px',
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
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StepTwoPage;
