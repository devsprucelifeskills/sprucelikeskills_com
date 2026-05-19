import crypto from 'crypto';
import axios from 'axios';

const EASEBUZZ_KEY = 'JFFDFKVBJ';
const EASEBUZZ_SALT = 'YOY2ECHB0';
const txnid = 'cba52ddeb610_1779164583732';
const amount = '15000.00';
const email = 'pratikc.cse22@sbjit.edu.in';
const phone = '9999999999';

const testHash1 = crypto.createHash('sha512').update(`${EASEBUZZ_KEY}|${txnid}|${EASEBUZZ_SALT}`).digest('hex');
const testHash2 = crypto.createHash('sha512').update(`${EASEBUZZ_KEY}|${txnid}|${amount}|${email}|${phone}|${EASEBUZZ_SALT}`).digest('hex');

const run = async () => {
  const txnApiUrl = 'https://testdashboard.easebuzz.in/transaction/v1/retrieve';

  console.log("Testing with Hash 1 (key|txnid|salt):", testHash1);
  try {
    const res1 = await axios.post(
      txnApiUrl,
      new URLSearchParams({
        key: EASEBUZZ_KEY,
        txnid,
        amount,
        email,
        phone,
        hash: testHash1
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log("Response 1:", res1.data);
  } catch (err) {
    console.error("Error 1:", err.message);
  }

  console.log("\nTesting with Hash 2 (key|txnid|amount|email|phone|salt):", testHash2);
  try {
    const res2 = await axios.post(
      txnApiUrl,
      new URLSearchParams({
        key: EASEBUZZ_KEY,
        txnid,
        amount,
        email,
        phone,
        hash: testHash2
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log("Response 2:", res2.data);
  } catch (err) {
    console.error("Error 2:", err.message);
  }
};

run();
