import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Theme } from '../types';

interface CaptchaFieldProps {
  theme: Theme;
  onVerify: (isValid: boolean) => void;
  resetKey?: number;
}

export const CaptchaField: React.FC<CaptchaFieldProps> = ({ theme, onVerify, resetKey }) => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [operator, setOperator] = useState<'+' | '-' | '*'>('+');
  const [expectedAnswer, setExpectedAnswer] = useState(8);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateNewChallenge = useCallback(() => {
    const ops: ('+' | '-' | '*')[] = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 12) + 2;
    let n2 = Math.floor(Math.random() * 10) + 1;
    let ans = 0;

    if (op === '-') {
      if (n1 < n2) {
        const temp = n1;
        n1 = n2;
        n2 = temp;
      }
      ans = n1 - n2;
    } else if (op === '+') {
      ans = n1 + n2;
    } else {
      n1 = Math.floor(Math.random() * 8) + 2;
      n2 = Math.floor(Math.random() * 5) + 1;
      ans = n1 * n2;
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setExpectedAnswer(ans);
    setUserAnswer('');
    setIsVerified(false);
    onVerify(false);
    setErrorMessage('');
  }, [onVerify]);

  useEffect(() => {
    generateNewChallenge();
  }, [resetKey, generateNewChallenge]);

  const handleInputChange = (val: string) => {
    setUserAnswer(val);
    const parsed = parseInt(val.trim(), 10);
    if (!isNaN(parsed) && parsed === expectedAnswer) {
      setIsVerified(true);
      onVerify(true);
      setErrorMessage('');
    } else {
      setIsVerified(false);
      onVerify(false);
      if (val.trim().length > 0) {
        setErrorMessage('Incorrect verification answer.');
      } else {
        setErrorMessage('');
      }
    }
  };

  return (
    <div className={`p-3.5 rounded-2xl border space-y-2.5 ${
      theme === 'dark' ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Security Captcha Verification</span>
        </div>
        <button
          type="button"
          onClick={generateNewChallenge}
          title="Refresh Captcha Challenge"
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>New Code</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Challenge Box */}
        <div className={`px-4 py-2 rounded-xl font-mono text-sm font-extrabold tracking-widest select-none border shadow-inner flex items-center gap-2 ${
          theme === 'dark'
            ? 'bg-neutral-950 border-neutral-700 text-rose-700'
            : 'bg-white border-neutral-300 text-rose-900'
        }`}>
          <span>{num1}</span>
          <span>{operator}</span>
          <span>{num2}</span>
          <span>=</span>
          <span className="text-neutral-500">?</span>
        </div>

        {/* User Input */}
        <div className="flex-1 relative">
          <input
            type="number"
            required
            placeholder="Enter answer"
            value={userAnswer}
            onChange={(e) => handleInputChange(e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono transition-all ${
              isVerified
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                : theme === 'dark'
                ? 'bg-neutral-950 border-neutral-800 text-white focus:border-rose-800'
                : 'bg-white border-neutral-300 text-neutral-900 focus:border-rose-800'
            }`}
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            {isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
        </div>
      </div>

      {errorMessage && !isVerified && (
        <p className="text-[10px] text-rose-800 font-medium flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}

      {isVerified && (
        <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 shrink-0" />
          <span>Captcha verified successfully. Secure submission unlocked.</span>
        </p>
      )}
    </div>
  );
};
