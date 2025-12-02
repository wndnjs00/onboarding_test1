import React from "react";
import svgPaths from "./imports/svg-hkox9tdlbo";
import "./styles/landingPage.css";
import { useState } from "react";

export default function LandingPage() {
  const [activePayment, setActivePayment] = useState<string | null>(null);
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null); // 🔹 추가
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null); // 🔹 추가

  // 🔹 지점별 불량률 데이터 (퍼센트 + 막대 높이)
  const branchBars = [
    { name: "강남점", percent: 12.5, height: 135 },      // 가장 높음
    { name: "신촌점", percent: 10.2, height: 112.5 },
    { name: "부산중앙점", percent: 8.1, height: 93.375 },
    { name: "대구점", percent: 7.3, height: 78.75 },
    { name: "인천점", percent: 6.8, height: 78.75 },
  ];

  // 🔹 월 매출 데이터 (툴팁용)
  const linePoints = [
    { month: "7월",  x: 103,  y: 125.86, sales: "₩2,500,000" },
    { month: "8월",  x: 336,  y: 116.86, sales: "₩2,800,000" },
    { month: "9월",  x: 569,  y: 130.36, sales: "₩2,400,000" },
    { month: "10월", x: 802,  y: 94.86,  sales: "₩3,200,000" },
    { month: "11월", x: 1035, y: 64.36,  sales: "₩3,900,000" },
    { month: "12월", x: 1268, y: 73.36,  sales: "₩3,700,000" },
  ];

  return (
    <div className="landing-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Back Office</h1>
          <p className="sidebar-subtitle">본사 관리자 시스템</p>
        </div>
        
        <div className="sidebar-menu">
          <div className="menu-item active">
            <div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p275d2400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p260aa300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            <span className="menu-item-text">메인 대시보드</span>
          </div>
          
          <div className="menu-item">
            <div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_1_454)">
                  <path d={svgPaths.p132f6300} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
                <defs>
                  <clipPath id="clip0_1_454">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="menu-item-text">시공판매/POS 관리</span>
          </div>
          
          <div className="menu-item">
            <div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p2fedb580} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M10 18.3333V10" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p2eca8c80} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M6.25 3.55834L13.75 7.85" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            <span className="menu-item-text">가맹점 관리</span>
          </div>
          
          <div className="menu-item">
            <div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p25397b80} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p18406864} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p2241fff0} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p2c4f400} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            <span className="menu-item-text">매출 및 회계</span>
          </div>
          
          <div className="menu-item">
            <div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p31172880} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p3abdf300} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M8.33333 7.5H6.66667" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M13.3333 10.8333H6.66667" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M13.3333 14.1667H6.66667" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            <span className="menu-item-text">CRM 통합 관리</span>
          </div>
          
          <div className="menu-item">
            < div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_1_390)">
                  <path d={svgPaths.p14d24500} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p17212180} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M1.66667 10H18.3333" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
                <defs>
                  <clipPath id="clip0_1_390">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="menu-item-text">홈페이지 데이터</span>
          </div>
          
          <div className="menu-item">
            <div className="menu-item-icon">
              <svg fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p337986c0} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            <span className="menu-item-text">보안 및 로그</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <input 
            type="text" 
            className="search-input" 
            placeholder="검색 (지점명, 시공번호, 차량번호 등)"
          />
          
          <div className="user-section">
            <button className="notification-btn">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p31962400} stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p1f3d9f80} stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
              <span className="notification-badge">1</span>
            </button>
            
            <div className="user-avatar">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p1beb9580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p32ab0300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
              </svg>
            </div>
            
            <div className="user-info">
              <p className="user-name">관리자</p>
              <p className="user-email">admin@backoffice.com</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <div className="dashboard-header">
            <h2 className="dashboard-title">메인 대시보드</h2>
            <p className="dashboard-subtitle">전체 가맹점 현황 및 핵심 지표를 확인하세요</p>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards-row">
            <div className="summary-card">
              <div className="summary-card-header">
                <h3 className="summary-card-title">총 가맹점 수</h3>
                <div className="summary-card-icon blue">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <g>
                      <path d="M8.33333 10H11.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M8.33333 6.66667H11.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p16bb4600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3b103700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p24196980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="summary-card-value">247</p>
              <p className="summary-card-change positive">↗ +12</p>
            </div>

            <div className="summary-card">
              <div className="summary-card-header">
                <h3 className="summary-card-title">오늘 시공 등록</h3>
                <div className="summary-card-icon green">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <g>
                      <path d={svgPaths.p3ac0b600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3c797180} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="summary-card-value">89</p>
              <p className="summary-card-change positive">↗ +23</p>
            </div>

            <div className="summary-card">
              <div className="summary-card-header">
                <h3 className="summary-card-title">금일 매출</h3>
                <div className="summary-card-icon purple">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <g>
                      <path d="M10 1.66667V18.3333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3055a600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="summary-card-value">₩12,450,000</p>
              <p className="summary-card-change positive">↗ +8.5%</p>
            </div>

            <div className="summary-card">
              <div className="summary-card-header">
                <h3 className="summary-card-title">누적미결제 알림</h3>
                <div className="summary-card-icon red">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <g clipPath="url(#clip0_1_381)">
                      <path d={svgPaths.p14d24500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M10 6.66667V10" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M10 13.3333H10.0083" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_381">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <p className="summary-card-value">7</p>
              <p className="summary-card-change negative">⊙ 즉시 확인 필요</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="charts-row">
            {/* Bar Chart */}
            <div className="chart-card">
              <h3 className="chart-title">지점별 불량률 Top 5</h3>
              <div className="bar-chart-container">
                <div className="bar-chart-y-axis">
                  <span className="bar-chart-y-label">16</span>
                  <span className="bar-chart-y-label">12</span>
                  <span className="bar-chart-y-label">8</span>
                  <span className="bar-chart-y-label">4</span>
                  <span className="bar-chart-y-label">0</span>
                </div>
                <div className="bar-chart-grid">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bar-chart-grid-line" />
                  ))}
                </div>
                <div className="bar-chart-bars">
                  {branchBars.map((branch, index) => (
                    <div
                      key={branch.name}
                      className="bar-chart-bar"
                      style={{ height: `${branch.height}px` }}
                      onMouseEnter={() => setHoveredBranch(index)}
                      onMouseLeave={() => setHoveredBranch(null)}
                    >
                      {hoveredBranch === index && (
                        <div className="bar-tooltip">
                          <div className="bar-tooltip-title">{branch.name}</div>
                          <div className="bar-tooltip-value">
                            불량률 (%): {branch.percent}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bar-chart-labels">
                  {branchBars.map((branch) => (
                    <span
                      key={branch.name}
                      className="bar-chart-label"
                    >
                      {branch.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="chart-card">
              <h3 className="chart-title large">결제 방식별 비율</h3>
              <div className="pie-chart-container">
                <div className="pie-chart-svg">
                  <svg width="160" height="160" fill="none" viewBox="0 0 160 160">
                    <g>
                      {/* 카드 */}
                      <path
                        d={svgPaths.pa76c100}
                        fill="#3B82F6"
                        onMouseEnter={() => setActivePayment("card")}
                        onMouseLeave={() => setActivePayment(null)}
                        style={{ cursor: "pointer" }}
                      />
                      {/* 현금 */}
                      <path
                        d={svgPaths.p3e5dd6b0}
                        fill="#22C55E"
                        onMouseEnter={() => setActivePayment("cash")}
                        onMouseLeave={() => setActivePayment(null)}
                        style={{ cursor: "pointer" }}
                      />
                      {/* 계좌이체 */}
                      <path
                        d={svgPaths.p12f8b680}
                        fill="#F59E0B"
                        onMouseEnter={() => setActivePayment("transfer")}
                        onMouseLeave={() => setActivePayment(null)}
                        style={{ cursor: "pointer" }}
                      />
                    </g>
                  </svg>
                </div>

                {/* legend 영역 - 상태에 따라 강조 */}
                <div
                  className={
                    "pie-chart-legend blue" +
                    (activePayment === "card" ? " pie-chart-legend-active" : "")
                  }
                >
                  카드: 65%
                </div>
                <div
                  className={
                    "pie-chart-legend green" +
                    (activePayment === "cash" ? " pie-chart-legend-active" : "")
                  }
                >
                  현금: 20%
                </div>
                <div
                  className={
                    "pie-chart-legend amber" +
                    (activePayment === "transfer" ? " pie-chart-legend-active" : "")
                  }
                >
                  계좌이체: 15%
                </div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="line-chart-full">
            <h3 className="chart-title">월 매출 그래프</h3>
            <div className="line-chart-container">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1294 310"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid lines - horizontal */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="103"
                    y1={25.86 + i * 44}
                    x2="1268"
                    y2={25.86 + i * 44}
                    stroke="#E5E7EB"
                    strokeDasharray="5.18 5.18"
                    strokeWidth="1.294"
                  />
                ))}
                {/* Grid lines - vertical */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={103 + i * 233}
                    y1="25.86"
                    x2={103 + i * 233}
                    y2="245.86"
                    stroke="#E5E7EB"
                    strokeDasharray="5.18 5.18"
                    strokeWidth="1.294"
                  />
                ))}
                {/* Line path */}
                <path
                  d="M103,125.86 L336,116.86 L569,130.36 L802,94.86 L1035,64.36 L1268,73.36"
                  stroke="#3B82F6"
                  strokeWidth="2.588"
                  fill="none"
                />
                {/* Points + Tooltip */}
                {linePoints.map((point, i) => (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredMonth(i)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="6.47"
                      fill="#3B82F6"
                      stroke="white"
                      strokeWidth="2.588"
                    />
                    {hoveredMonth === i && (
                      <g>
                        <rect
                          x={point.x - 90}
                          y={point.y - 80}
                          width="180"
                          height="60"
                          rx="8"
                          fill="white"
                          stroke="#E5E7EB"
                        />
                        <text
                          x={point.x - 78}
                          y={point.y - 60}
                          fill="#0A0A0A"
                          fontSize="14"
                          fontFamily="Inter, Noto Sans KR, sans-serif"
                        >
                          {point.month}
                        </text>
                        <text
                          x={point.x - 78}
                          y={point.y - 36}
                          fill="#2563EB"
                          fontSize="14"
                          fontFamily="Inter, Noto Sans KR, sans-serif"
                        >
                          매출 : {point.sales}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
                {/* Y-axis labels */}
                <text x="15" y="23"  fontSize="14.234" fill="#6a7282" fontFamily="Inter, sans-serif">5,000,000</text>
                <text x="15" y="67"  fontSize="14.234" fill="#6a7282" fontFamily="Inter, sans-serif">4,000,000</text>
                <text x="15" y="111" fontSize="14.234" fill="#6a7282" fontFamily="Inter, sans-serif">3,000,000</text>
                <text x="15" y="155" fontSize="14.234" fill="#6a7282" fontFamily="Inter, sans-serif">2,000,000</text>
                <text x="15" y="199" fontSize="14.234" fill="#6a7282" fontFamily="Inter, sans-serif">1,000,000</text>
                <text x="75" y="243" fontSize="14.234" fill="#6a7282" fontFamily="Inter, sans-serif">0</text>
                {/* X-axis labels */}
                <text x="103"  y="284" fontSize="14.234" fill="#6a7282" fontFamily="Inter, Noto Sans KR, sans-serif" textAnchor="middle">7월</text>
                <text x="336"  y="284" fontSize="14.234" fill="#6a7282" fontFamily="Inter, Noto Sans KR, sans-serif" textAnchor="middle">8월</text>
                <text x="569"  y="284" fontSize="14.234" fill="#6a7282" fontFamily="Inter, Noto Sans KR, sans-serif" textAnchor="middle">9월</text>
                <text x="802"  y="284" fontSize="14.234" fill="#6a7282" fontFamily="Inter, Noto Sans KR, sans-serif" textAnchor="middle">10월</text>
                <text x="1035" y="284" fontSize="14.234" fill="#6a7282" fontFamily="Inter, Noto Sans KR, sans-serif" textAnchor="middle">11월</text>
                <text x="1268" y="284" fontSize="14.234" fill="#6a7282" fontFamily="Inter, Noto Sans KR, sans-serif" textAnchor="middle">12월</text>
              </svg>
            </div>
            <div className="line-chart-legend">
              <span className="line-chart-legend-text">← 매출</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bottom-row">
            {/* Notice Card */}
            <div className="notice-card">
              <h3 className="chart-title">알림 센터</h3>
              <div className="notice-list">
                <div className="notice-item red">
                  <h4 className="notice-item-title">POS 미입력</h4>
                  <p className="notice-item-description">강남점 - 시공번호 #2024120201 미입력 (2시간 경과)</p>
                </div>
                
                <div className="notice-item yellow">
                  <h4 className="notice-item-title">가격 정책 위반</h4>
                  <p className="notice-item-description">신촌점 - 표준가격 대비 -15% 할인 적용</p>
                </div>
                
                <div className="notice-item red">
                  <h4 className="notice-item-title">불량률 초과</h4>
                  <p className="notice-item-description">부산중앙점 - 이번 달 불량률 12.5% (기준 5%)</p>
                </div>
                
                <div className="notice-item blue">
                  <h4 className="notice-item-title">시스템 로그</h4>
                  <p className="notice-item-description">서버 백업 완료 - 2024.12.02 03:00</p>
                </div>
              </div>
            </div>

            {/* Star Rating Card */}
            <div className="star-rating-card">
              <h3 className="chart-title">최근 리뷰 평균 점수</h3>
              <div className="rating-list">
                <div className="rating-item">
                  <div className="rating-item-icon">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <g>
                        <path d={svgPaths.p2fedb580} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M10 18.3333V10" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2eca8c80} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M6.25 3.55834L13.75 7.85" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                  <div className="rating-item-info">
                    <h4 className="rating-item-name">강남점</h4>
                    <p className="rating-item-reviews">124개 리뷰</p>
                  </div>
                  <div className="rating-item-score">
                    <svg className="rating-item-star" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p2c876580} fill="#FFC107" stroke="#FFC107" strokeWidth="0.5" />
                    </svg>
                    <p className="rating-item-number">4.8</p>
                  </div>
                </div>

                <div className="rating-item">
                  <div className="rating-item-icon">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <g>
                        <path d={svgPaths.p2fedb580} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M10 18.3333V10" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2eca8c80} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M6.25 3.55834L13.75 7.85" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                  <div className="rating-item-info">
                    <h4 className="rating-item-name">신촌점</h4>
                    <p className="rating-item-reviews">98개 리뷰</p>
                  </div>
                  <div className="rating-item-score">
                    <svg className="rating-item-star" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p2c876580} fill="#FFC107" stroke="#FFC107" strokeWidth="0.5" />
                    </svg>
                    <p className="rating-item-number">4.6</p>
                  </div>
                </div>

                <div className="rating-item">
                  <div className="rating-item-icon">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <g>
                        <path d={svgPaths.p2fedb580} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M10 18.3333V10" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2eca8c80} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M6.25 3.55834L13.75 7.85" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                  <div className="rating-item-info">
                    <h4 className="rating-item-name">부산중앙점</h4>
                    <p className="rating-item-reviews">87개 리뷰</p>
                  </div>
                  <div className="rating-item-score">
                    <svg className="rating-item-star" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p2c876580} fill="#FFC107" stroke="#FFC107" strokeWidth="0.5" />
                    </svg>
                    <p className="rating-item-number">4.2</p>
                  </div>
                </div>

                <div className="rating-item">
                  <div className="rating-item-icon">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <g>
                        <path d={svgPaths.p2fedb580} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M10 18.3333V10" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2eca8c80} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M6.25 3.55834L13.75 7.85" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                  <div className="rating-item-info">
                    <h4 className="rating-item-name">대구점</h4>
                    <p className="rating-item-reviews">156개 리뷰</p>
                  </div>
                  <div className="rating-item-score">
                    <svg className="rating-item-star" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p2c876580} fill="#FFC107" stroke="#FFC107" strokeWidth="0.5" />
                    </svg>
                    <p className="rating-item-number">4.9</p>
                  </div>
                </div>

                <div className="rating-item">
                  <div className="rating-item-icon">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <g>
                        <path d={svgPaths.p2fedb580} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M10 18.3333V10" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2eca8c80} stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M6.25 3.55834L13.75 7.85" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                  <div className="rating-item-info">
                    <h4 className="rating-item-name">인천점</h4>
                    <p className="rating-item-reviews">112개 리뷰</p>
                  </div>
                  <div className="rating-item-score">
                    <svg className="rating-item-star" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p2c876580} fill="#FFC107" stroke="#FFC107" strokeWidth="0.5" />
                    </svg>
                    <p className="rating-item-number">4.7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}