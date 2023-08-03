import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StepThreePage = () => {
  const { state } = useLocation();
  const { inputBoxes, content } = state;

  const navigate = useNavigate();

  const [selectedInputBoxes, setSelectedInputBoxes] = useState({});
  const [showResults, setShowResults] = useState(false);

  const toggleInputBox = (contentId, inputBoxId) => {
    setSelectedInputBoxes((prevSelected) => {
      const currentSelected = prevSelected[contentId] || [];
      const updatedSelected = currentSelected.includes(inputBoxId)
        ? currentSelected.filter((id) => id !== inputBoxId)
        : [...currentSelected, inputBoxId];
      return { ...prevSelected, [contentId]: updatedSelected };
    });
  };

  const handleCalculation = () => {
    const roundingOption = document.querySelector(
      'input[name="rounding-option"]:checked'
    ).value;

    const results = content.map((item) => {
      const selectedUsers = selectedInputBoxes[item.id] || [];
      const userCount = selectedUsers.length;
      const totalAmount = parseFloat(item.amount);
      let dividedAmount = userCount > 0 ? totalAmount / userCount : 0;

      if (roundingOption === '100') {
        dividedAmount = Math.floor(dividedAmount / 100) * 100;
      } else if (roundingOption === '10') {
        dividedAmount = Math.floor(dividedAmount / 10) * 10;
      }

      return {
        contentId: item.id,
        content: item.content,
        userCount,
        dividedAmount,
        selectedUsers: selectedUsers.map(
          (userId) => inputBoxes.find((box) => box.id === userId).userNm
        ),
      };
    });

    setCalculationResults(results);
    setShowResults(true);
  };

  const handleGoBack = () => {
    navigate('/StepTwo', { state: { inputBoxes } });
  };

  const [calculationResults, setCalculationResults] = useState([]);

  return (
    <div style={styles.stepThreeContainer}>
      {content.map((item) => (
        <div key={item.id} style={styles.contentSection}>
          <h3>{item.content}</h3>
          <div>
            {inputBoxes.map((box) => (
              <div key={box.id}>
                <label>
                  <input
                    type='checkbox'
                    checked={(selectedInputBoxes[item.id] || []).includes(
                      box.id
                    )}
                    onChange={() => toggleInputBox(item.id, box.id)}
                  />
                  {box.userNm}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <label>
          <input
            type='radio'
            name='rounding-option'
            value='default'
            defaultChecked
          />
          기본(나누기)
        </label>
        <label>
          <input type='radio' name='rounding-option' value='100' />
          100 단위 절삭
        </label>
        <label>
          <input type='radio' name='rounding-option' value='10' />
          10 단위 절삭
        </label>
      </div>
      <div style={styles.moveBtnGroup}>
        <button onClick={handleGoBack} style={styles.buttonStyle}>
          이전
        </button>
        <button onClick={handleCalculation} style={styles.buttonStyle}>
          정산
        </button>
      </div>
      {showResults && (
        <div style={styles.contentSection}>
          <h2>정산 결과</h2>
          <div>
            {calculationResults.map((result) => (
              <div key={result.contentId}>
                <p>{result.content}</p>
                <p>정산 인원: {result.selectedUsers.join(', ')}</p>
                <p>정산 금액: {result.dividedAmount.toFixed(0)} 원</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepThreePage;

const styles = {
  stepThreeContainer: {
    maxWidth: '800px',
    padding: '20px',
  },

  contentSection: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  },
  buttonStyle: {
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

  moveBtnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    marginTop: '20px',
  },
};
