import "./header.css";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const Header = () => {
  return (
    <>
      <header>
        <div className="inner">
          <a href="/" className="logo">
            <img src="./peachMarket2.PNG" alt="PEACH MARKET" />
            <img src="./여기어때.PNG" alt="PEACH MARKET" />
          </a>

          <div className="sub-menu">
            <ul className="menu">
              <li>
                <a href="/signin">Sign In</a>
              </li>
              <li>
                <a href="#">내 정보</a>
              </li>
              <li>
                <a href="#">TEST</a>
              </li>
              <li>
                <a href="#">TEST</a>
              </li>
            </ul>
          </div>

          <ul className="main-menu">
            <li className="item">
              <div className="item__name material-icons">
                <MenuIcon />
              </div>
              <div className="item__contents">
                <div className="contents__menu">
                  <div className="inner">
                    <ul>
                      <li>커피</li>
                      <li>커피1</li>
                      <li>커피2</li>
                      <li>커피3</li>
                    </ul>
                    <ul>
                      <li>빵1</li>
                      <li>빵2</li>
                      <li>빵3</li>
                      <li>빵4</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="item">
              <div className="item__name">1</div>
            </li>

            <li className="item">
              <div className="item__name">2</div>
            </li>

            <li className="item">
              <div className="item__name">3</div>
            </li>
          </ul>

          <ul className="main-menu-center">
            <div className="search">
              <input type="text" />
              <div className="item__name material-icons">
                <SearchIcon />
              </div>
            </div>
          </ul>
          <ul className="main-menu-right">
            <div className="item__name material-icons">
              <ChatBubbleOutlineIcon />
            </div>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
