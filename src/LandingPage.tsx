import React from "react";
import svgPaths from "./imports/svg-hkox9tdlbo";
import "./styles/landingPage.css";
import { useState } from "react";

export default function LandingPage() {
  const [activePayment, setActivePayment] = useState<string | null>(null);
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null); // 🔹 추가
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null); // 🔹 추가

  // 🔹 지점별 불량률 데이터 (percent만 입력하면 자동으로 높이 계산)
  const branchBars = [
    { name: "강남점", percent: 28.5 },
    { name: "신촌점", percent: 50.2 },
    { name: "부산중앙점", percent: 8.1 },
    { name: "대구점", percent: 7.3 },
    { name: "인천점", percent: 6.8 },
  ];

  // 🔹 막대 그래프 계산 함수
  const calculateBarChart = (data: typeof branchBars) => {
    const maxPercent = Math.max(...data.map(d => d.percent));
    const maxHeight = 135; // 최대 막대 높이 (px)
    const chartHeight = 256; // 차트 전체 높이
    const chartTop = 20; // 차트 상단 여백
    const chartBottom = 24; // 차트 하단 여백
    const availableHeight = chartHeight - chartTop - chartBottom;
    
    // Y축 레이블 생성 (0부터 최대값까지 5단계)
    const yAxisMax = Math.ceil(maxPercent / 4) * 4; // 4의 배수로 올림
    const yAxisLabels = [yAxisMax, yAxisMax * 0.75, yAxisMax * 0.5, yAxisMax * 0.25, 0];
    
    return {
      bars: data.map(item => ({
        ...item,
        height: (item.percent / yAxisMax) * availableHeight,
      })),
      yAxisLabels,
    };
  };

  const barChartData = calculateBarChart(branchBars);

  // 🔹 결제 방식별 데이터 (동적으로 변경 가능)
  const paymentData = [
    { name: "카드", percent:65, color: "#3B82F6", type: "card" },
    { name: "현금", percent: 20, color: "#22C55E", type: "cash" },
    { name: "계좌이체", percent: 15, color: "#F59E0B", type: "transfer" },
  ];

  // 🔹 파이 차트 경로 생성 함수
  const generatePiePath = (data: typeof paymentData) => {
    const centerX = 80;
    const centerY = 80;
    const radius = 80;
    const labelRadius = 115; // 레이블이 원 밖에 위치하도록 하는 반지름 (모든 레이블 동일한 거리)
    let currentAngle = -90; // 시작 각도 (12시 방향)
    
    return data.map((item) => {
      const angle = (item.percent / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      const centerAngle = currentAngle + angle / 2; // 세그먼트의 중심 각도
      
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      const centerAngleRad = (centerAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      // 레이블 위치 클래스 결정 (각도에 따라)
      let labelPosition = '';
      if (centerAngle >= -45 && centerAngle < 45) {
        labelPosition = 'right'; // 오른쪽 (카드)
      } else if (centerAngle >= 45 && centerAngle < 135) {
        labelPosition = 'bottom'; // 아래쪽
      } else if (centerAngle >= 135 && centerAngle < 225) {
        labelPosition = 'left'; // 왼쪽 (현금)
      } else {
        labelPosition = 'top'; // 위쪽 (계좌이체)
      }
      
      // 레이블 위치 계산 (세그먼트 중심에서 바깥쪽으로)
      // 계좌이체는 차트에 더 가깝게 배치
      const adjustedLabelRadius = labelPosition === 'top' ? 95 : labelRadius;
      const labelOffsetX = adjustedLabelRadius * Math.cos(centerAngleRad);
      const labelOffsetY = adjustedLabelRadius * Math.sin(centerAngleRad);
      
      currentAngle += angle;
      
      return {
        ...item,
        path,
        labelOffsetX,
        labelOffsetY,
        labelPosition,
        centerAngle,
      };
    });
  };

  const piePaths = generatePiePath(paymentData);

  // 🔹 월 매출 데이터 (sales 값만 입력하면 자동으로 좌표 계산)
  const monthlySales = [
    { month: "7월", sales: 6500000 },
    { month: "8월", sales: 2800000 },
    { month: "9월", sales: 2400000 },
    { month: "10월", sales: 3200000 },
    { month: "11월", sales: 3900000 },
    { month: "12월", sales: 3700000 },
  ];

  // 🔹 금액 포맷팅 함수 (천 단위 구분자 사용)
  const formatCurrency = (amount: number): string => {
    return `₩${amount.toLocaleString('ko-KR')}`;
  };

  // 🔹 선 그래프 계산 함수
  const calculateLineChart = (data: typeof monthlySales) => {
    const salesValues = data.map(d => d.sales);
    const minSales = Math.min(...salesValues);
    const maxSales = Math.max(...salesValues);
    
    // 차트 영역 설정
    const chartWidth = 1294;
    const chartHeight = 310;
    const paddingLeft = 103;
    const paddingRight = 26;
    const paddingTop = 25.86;
    const paddingBottom = 64.14;
    const graphWidth = chartWidth - paddingLeft - paddingRight;
    const graphHeight = chartHeight - paddingTop - paddingBottom;
    
    // X 좌표 계산 (균등 분배)
    const pointCount = data.length;
    const xSpacing = graphWidth / (pointCount - 1);
    
    // Y 좌표 계산 (매출 값에 비례)
    const salesRange = maxSales - minSales;
    const yAxisMax = Math.ceil(maxSales / 1000000) * 1000000; // 100만 단위로 올림
    const yAxisMin = Math.floor(minSales / 1000000) * 1000000; // 100만 단위로 내림
    const yRange = yAxisMax - yAxisMin;
    
    const points = data.map((item, index) => {
      const x = paddingLeft + index * xSpacing;
      // Y는 위에서 아래로 증가 (SVG 좌표계)
      const y = paddingTop + graphHeight - ((item.sales - yAxisMin) / yRange) * graphHeight;
      
      return {
        ...item,
        x,
        y,
        salesFormatted: formatCurrency(item.sales),
      };
    });
    
    // 경로 생성
    const pathD = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`
    ).join(' ');
    
    // Y축 레이블 생성
    const yAxisSteps = 5;
    const yAxisLabels: Array<{ value: number; y: number; formatted: string }> = [];
    for (let i = 0; i <= yAxisSteps; i++) {
      const value = yAxisMax - (i / yAxisSteps) * yRange;
      const y = paddingTop + (i / yAxisSteps) * graphHeight;
      yAxisLabels.push({ value, y, formatted: formatCurrency(value) });
    }
    
    return {
      points,
      pathD,
      yAxisLabels,
    };
  };

  const lineChartData = calculateLineChart(monthlySales);

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
            <span className="menu-item-text">시공번호/POS 관리</span>
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
                  {barChartData.yAxisLabels.map((label, index) => (
                    <span key={index} className="bar-chart-y-label">{label}</span>
                  ))}
                </div>
                <div className="bar-chart-grid">
                  {barChartData.yAxisLabels.map((_, i) => (
                    <div key={i} className="bar-chart-grid-line" />
                  ))}
                </div>
                <div className="bar-chart-bars">
                  {barChartData.bars.map((branch, index) => (
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
                  {barChartData.bars.map((branch) => (
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
                      {piePaths.map((item, index) => (
                        <path
                          key={item.type}
                          d={item.path}
                          fill={item.color}
                          onMouseEnter={() => setActivePayment(item.type)}
                          onMouseLeave={() => setActivePayment(null)}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </g>
                  </svg>
                </div>

                {/* legend 영역 - 상태에 따라 강조 */}
                {piePaths.map((item) => {
                  const legendClass = 
                    item.type === "card" ? "blue" :
                    item.type === "cash" ? "green" : "amber";
                  
                  // 컨테이너 중심(50%, 50%)을 기준으로 오프셋 적용
                  return (
                    <div
                      key={item.type}
                      className={
                        `pie-chart-legend ${legendClass} pie-chart-legend-${item.labelPosition}` +
                        (activePayment === item.type ? " pie-chart-legend-active" : "")
                      }
                      style={{
                        left: `calc(50% + ${item.labelOffsetX}px)`,
                        top: `calc(50% + ${item.labelOffsetY}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {item.name}: {item.percent}%
                    </div>
                  );
                })}
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
                  d={lineChartData.pathD}
                  stroke="#3B82F6"
                  strokeWidth="2.588"
                  fill="none"
                />
                {/* Points + Tooltip */}
                {lineChartData.points.map((point, i) => (
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
                          매출 : {point.salesFormatted}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
                {/* Y-axis labels */}
                {lineChartData.yAxisLabels.map((label, index) => (
                  <text
                    key={index}
                    x="15"
                    y={label.y + 5}
                    fontSize="14.234"
                    fill="#6a7282"
                    fontFamily="Inter, sans-serif"
                  >
                    {label.formatted}
                  </text>
                ))}
                {/* X-axis labels */}
                {lineChartData.points.map((point, index) => (
                  <text
                    key={index}
                    x={point.x}
                    y="284"
                    fontSize="14.234"
                    fill="#6a7282"
                    fontFamily="Inter, Noto Sans KR, sans-serif"
                    textAnchor="middle"
                  >
                    {point.month}
                  </text>
                ))}
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
              <div className="notice-card-header">
                <h3 className="chart-title">누락·비정상 알림</h3>
                <button className="notice-view-all">
                  <span>전체보기</span>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="#2B7FFF" strokeWidth="1.5" fill="none"/>
                    <circle cx="8" cy="8" r="2" fill="#2B7FFF"/>
                  </svg>
                </button>
              </div>
              <div className="notice-list">
                <div className="notice-item red">
                  <h4 className="notice-item-title">POS 미입력</h4>
                  <p className="notice-item-description">강남점 - 시공번호 #2024120201 미입력 (2시간 경과)</p>
                </div>
                
                <div className="notice-item red">
                  <h4 className="notice-item-title">불량률 초과</h4>
                  <p className="notice-item-description">부산중앙점 - 이번 달 불량률 12.5% (기준 5%)</p>
                </div>

                <div className="notice-item red">
                  <h4 className="notice-item-title">POS 미입력</h4>
                  <p className="notice-item-description">대구점 - 시공번호 #2024120205 미입력 (3시간 경과)</p>
                </div>
                
              </div>
            </div>

            {/* Star Rating Card */}
            <div className="star-rating-card">
              <div className="notice-card-header">
                <h3 className="chart-title">최근 리뷰 평균 점수</h3>
                <button className="notice-view-all">
                  <span>전체보기</span>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="#2B7FFF" strokeWidth="1.5" fill="none"/>
                    <circle cx="8" cy="8" r="2" fill="#2B7FFF"/>
                  </svg>
                </button>
              </div>
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