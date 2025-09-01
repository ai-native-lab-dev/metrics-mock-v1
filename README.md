# Metrics Dashboard

A comprehensive React-based dashboard application for analyzing customer experience metrics with a responsive sidebar navigation system.

## Features

### 🎯 **Core Functionality**
- **Responsive Sidebar Navigation**: Collapsible sections with expandable sub-menus
- **Dynamic View System**: Switch between different analysis views based on navigation
- **Interactive Data Tables**: Expandable metric groups with detailed information
- **Real-time Controls**: Toggle between monthly/weekly views and apply dimension filters

### 📊 **Views Available**
1. **Metrics Overview** (Default): Displays 4 navigation groups with 40 comprehensive metrics
2. **CX Impact Analysis**: Focused analysis of P90/P95 metrics with transcript samples
3. **Methodology**: Comprehensive documentation with interactive diagrams

### 🎨 **Design Features**
- **Tailwind CSS**: Modern, utility-first styling framework
- **Inter Font**: Clean, readable typography from Google Fonts
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Custom Components**: Reusable UI components with consistent styling
- **Pastel Colored Cards**: Each metric has a unique pastel color for easy recognition
- **Consistent Color Scheme**: Professional pastel palette for different metric categories

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Responsive Design** with mobile-first approach

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:ai-native-lab-dev/metrics-mock-v1.git
   cd metrics-mock-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx     # Navigation sidebar with expandable sections
│   ├── Header.tsx      # Top header with mobile menu button
│   ├── Controls.tsx    # View toggle and dimension filters
│   └── MetricsTable.tsx # Interactive data table component
├── views/              # Main view components
│   ├── MetricsOverview.tsx # Default metrics view with 4 navigation groups
│   ├── CXImpact.tsx    # CX Impact analysis view
│   └── Methodology.tsx # Methodology documentation view
├── App.tsx             # Main application component
└── index.css           # Global styles and Tailwind directives
```

## Color Coding System

The application uses a consistent pastel color scheme to improve user experience and visual organization:

### 🎨 **Pastel Color Palette**

#### **Primary Navigation Colors**
- **Teal (Total Interactions)**: `bg-teal-50`, `border-teal-200`, `bg-teal-100`, `bg-teal-400`
  - Used for: Total interaction metrics, cross-channel analysis
  - Represents: Comprehensive, holistic view of all interactions

- **Blue (Bot/Self-Service)**: `bg-blue-50`, `border-blue-200`, `bg-blue-100`, `bg-blue-400`
  - Used for: Bot performance, AI-enabled services
  - Represents: Technology-driven, automated solutions

- **Orange (CSA/Human)**: `bg-orange-50`, `border-orange-200`, `bg-orange-100`, `bg-orange-400`
  - Used for: Customer Service Agent metrics, human-led interactions
  - Represents: Human touch, personalized service

- **Purple (Visit/Page)**: `bg-purple-50`, `border-purple-200`, `bg-purple-100`, `bg-purple-400`
  - Used for: Page visits, self-guided interactions
  - Represents: Self-service, user-initiated activities

#### **Color Application Areas**
1. **Sidebar Navigation**: Sub-navigation items use their respective colors
2. **Metrics Table**: Group headers and metric cards use consistent colors
3. **CS Channel Trends**: Section headers and quick navigation buttons
4. **CX Impact**: Metric group headers and analysis sections

#### **Color Psychology & UX Benefits**
- **Visual Hierarchy**: Colors help users quickly identify metric categories
- **Memory Aid**: Consistent colors improve recall and navigation
- **Professional Appearance**: Pastel tones maintain readability while being visually appealing
- **Accessibility**: High contrast ratios ensure readability for all users

#### **Implementation Details**
```typescript
// Color mapping function used throughout the application
function getGroupColors(groupName: string) {
  if (groupName.includes('Total Interactions')) {
    return { bg: 'bg-teal-50', border: 'border-teal-200', header: 'bg-teal-100', dot: 'bg-teal-400' };
  } else if (groupName.includes('Bot')) {
    return { bg: 'bg-blue-50', border: 'border-blue-200', header: 'bg-blue-100', dot: 'bg-blue-400' };
  } else if (groupName.includes('CSA') || groupName.includes('Human')) {
    return { bg: 'bg-orange-50', border: 'border-orange-200', header: 'bg-orange-100', dot: 'bg-orange-400' };
  } else if (groupName.includes('Visit') || groupName.includes('Page')) {
    return { bg: 'bg-purple-50', border: 'border-purple-200', header: 'bg-purple-100', dot: 'bg-purple-400' };
  }
  return { bg: 'bg-gray-50', border: 'border-gray-200', header: 'bg-gray-100', dot: 'bg-gray-400' };
}
```

## Metrics Organization

The dashboard organizes metrics under 4 clear sub-navigations:

### 1. **Total Interactions** (10 metrics) - 🟢 Teal
- Cross-channel interaction analysis
- Repeat interaction patterns
- Channel escalation metrics

### 2. **Self-Service: Bot Only** (10 metrics) - 🔵 Blue
- Bot performance metrics
- Resolution rates and response times
- User satisfaction and escalation rates

### 3. **Human-Led: CSA Only** (10 metrics) - 🟠 Orange
- Customer Service Agent metrics
- Handle times and resolution rates
- Customer satisfaction scores

### 4. **Self-Guided: Page Visits** (10 metrics) - 🟣 Purple
- Website analytics and user behavior
- Self-service completion rates
- Help center and FAQ usage

### 5. **CS Channel Trends** - 📊 Multi-Color Matrix
- **Interactive line chart** with color-coded trends
- **Bot trends**: Blue line (`#3b82f6`)
- **CSA trends**: Orange line (`#f97316`) 
- **Visit trends**: Purple line (`#a855f7`)
- **Section headers**: Match the main color scheme (Teal, Blue, Orange, Purple)
- **Quick navigation buttons**: Color-coded for easy section access

## Component Details

### Sidebar Navigation
- **Fixed width** on medium screens and larger
- **Collapsible on mobile** with overlay
- **Expandable sections** for Metrics, CX Impact, and Methodology
- **Active state indicators** for current view
- **4 clear sub-navigations** under Metrics section

### Metrics Table
- **40 comprehensive metrics** across 4 navigation groups
- **Pastel colored cards** for each metric (blue, green, purple, pink, etc.)
- **Weekly pagination** with 13, 26, 39, 52 week options
- **Sticky headers and columns** for easy scrolling
- **Unit column** properly positioned (Count, %, min)
- **Interactive data cells** with hover effects

### Controls Component
- **View toggle** between Monthly and Weekly data
- **Dimension filters** for Reporting Vertical and Customer Segment
- **Responsive layout** that stacks on smaller screens

## Custom CSS Classes

The application includes several custom CSS classes defined in Tailwind:

```css
.btn-active          /* Deep blue background for selected buttons */
.diff-positive       /* Green text for positive percentage changes */
.diff-negative       /* Red text for negative percentage changes */
.selected-period     /* Light blue background for selected data cells */
```

## Data Structure

### Metric Groups
Each metric group contains:
- **Metric Name**: Clear identifier for the metric
- **Question**: What business question the metric answers
- **Definition**: Detailed explanation of the metric
- **Data Arrays**: 2025 and 2024 values for each time period (52 weeks of data)

### Special Metrics (P90/P95)
- **TL;DR Definition**: Short, actionable summary
- **Full Definition**: Expandable detailed explanation
- **Toggle Button**: Show/hide full definition

## Responsive Behavior

### Desktop (lg+)
- Sidebar always visible
- Full two-column layout
- All controls visible in horizontal layout

### Tablet (md)
- Sidebar visible but can be toggled
- Controls stack vertically
- Maintains table functionality

### Mobile (sm)
- Sidebar hidden by default
- Hamburger menu to toggle sidebar
- Controls stack vertically
- Table becomes horizontally scrollable

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.
