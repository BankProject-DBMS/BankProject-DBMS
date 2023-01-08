import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyling/HomePage.css';
import Logo from './Images/Logo2.png';
import BankPhoto from './Images/BankPhoto.jpg';
import { Button } from 'antd';

export default function EmployeeHome() {
  const navigate = useNavigate();
  return (
    <div className='HomePage'>
      <div className='navbar'>
        <img className='aruci--logo' src={Logo} />
        <div className='buttons'>
          <Button className='button' onClick={() => navigate('employeePortal')}>
            Employee Portal
          </Button>
          <Button className='button' onClick={() => navigate('customerPortal')}>
            Customer Portal
          </Button>
        </div>
      </div>

      <div className='Body'>
        <img className='BankPhoto' src={BankPhoto} />
        <div className='paras'>
          <div className='twoparas'>
            <div className='para'>
              <h3>ARUCI Pinnacle</h3>
              <p>
                Welcome to ARUCI Pinnacle, a seamless financial experience to
                reach new heights of success. ARUCI Pinnacle, an all new
                exclusive Premier banking experience, with a personalized
                service and a repertoire of products and services to help you
                seize opportunities and reach new heights of success.
              </p>
            </div>
            <div className='para'>
              <h3>ARUCI Salary Partner</h3>
              <p>
                You get so much more with your monthly salary when you have
                Salary Partner from ARUCI Bank. This Spectacular partnership
                will bring your dreams and aspirations within easy reach,
                allowing you to lay the foundation for your future success. The
                answer is the ARUCI Salary Partner.
              </p>
            </div>
          </div>
          <div className='twoparas'>
            <div className='para'>
              <h3>ARUCI Adult Account</h3>
              <p>
                ARUCI Adult is a financial solution designed to empower females
                across Sri Lanka to achieve their career goals, business
                ambitions and personal dreams.
              </p>
            </div>
            <div className='para'>
              <h3>ARUCI Teen Account</h3>
              <p>
                Talents emerge in your teens! Save the money you earn using your
                talent, your pocket money and cash gifts in a ARUCI Teen
                Account.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='footer'>
        <div className='content'>
          <h2>Get in Touch</h2>
          <p>
            <b>Address:</b> No. 40, Galle Road, Moratuwa, Sri Lanka.
          </p>
          <p>
            <b>Email:</b> ARUCI@gmail.com
          </p>
          <p>
            <b>Tel:</b> +94 71 485 1234
          </p>
          <h5 align='center'>ARUCI ©2022 Created by ARUCI UI</h5>
        </div>
      </div>
    </div>
  );
}
