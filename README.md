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
2. **CS Channel Trends**: Interactive analysis of channel transition patterns
3. **CX Impact Analysis**: Focused analysis of P90/P95 metrics with transcript samples
4. **Methodology**: Comprehensive documentation with interactive diagrams
5. **Customer Interaction Matrix**: Detailed taxonomy of customer interactions with L0-L8 levels

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
   - If port 3000 is available: Navigate to `http://localhost:3000`
   - If port 3000 is occupied: The app will automatically use the next available port (e.g., `http://localhost:3001`)
   - Check the terminal output for the exact URL

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
│   ├── CSChannelTrends.tsx # CS Channel Trends analysis view
│   ├── CXImpact.tsx    # CX Impact analysis view
│   ├── Methodology.tsx # Methodology documentation view
│   ├── CustomerInteractionMatrix.tsx # Customer interaction taxonomy matrix
│   ├── ChannelMatrixRules.tsx # Channel matrix rules documentation
│   ├── InteractionFramework.tsx # Customer interaction framework
│   └── MetricsDictionary.tsx # Metrics dictionary and definitions
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

- **Cyan (CS Channel Trends)**: `bg-cyan-50`, `border-cyan-200`, `bg-cyan-100`, `bg-cyan-400`
  - Used for: CS Channel Trends navigation, channel analysis components
  - Represents: Cross-channel flow analysis, channel transition insights
  - Colors: Main `#06b6d4` (Cyan-500), Light `#67e8f9` (Cyan-300), Pastel `#a7f3d0` (Emerald-200)

- **Rose/Pink (P95 Metrics)**: `bg-gradient-to-br from-rose-50 to-pink-50`, `border-rose-200`, `bg-gradient-to-r from-rose-100 to-pink-100`, `bg-rose-400`
  - Used for: P95 percentile metrics, high-impact customer experience analysis
  - Represents: Critical performance indicators, egregious customer contacts
  - Colors: Gradient from Rose-50 to Pink-50, Rose-200 borders, Rose-400 accents

- **Indigo/Violet (P90 Metrics)**: `bg-gradient-to-br from-indigo-50 to-violet-50`, `border-indigo-200`, `bg-gradient-to-r from-indigo-100 to-violet-100`, `bg-indigo-400`
  - Used for: P90 percentile metrics, high-volume customer experience analysis
  - Represents: Performance benchmarks, customer experience optimization
  - Colors: Gradient from Indigo-50 to Violet-50, Indigo-200 borders, Indigo-400 accents

#### **Color Application Areas**
1. **Sidebar Navigation**: Sub-navigation items use their respective colors
2. **Metrics Table**: Group headers and metric cards use consistent colors
3. **CS Channel Trends**: Section headers and quick navigation buttons (cyan theme)
4. **Channel Filters**: Multi-level dropdown filters with cyan pastel background (cyan theme)
5. **P90/P95 Metrics**: Special gradient backgrounds for percentile metrics (rose/pink for P95, indigo/violet for P90)
6. **CX Impact**: Metric group headers and analysis sections

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

### 5. **CS Channel Trends** - 🔷 Cyan-Themed Analysis
- **Interactive line chart** with color-coded trends
- **Bot trends**: Blue line (`#3b82f6`)
- **CSA trends**: Orange line (`#f97316`) 
- **Visit trends**: Purple line (`#a855f7`)
- **Navigation theme**: Cyan (`#06b6d4`) for all CS Channel Trends elements
- **Section headers**: Maintain individual color scheme (Bot=Blue, CSA=Orange, Visit=Purple)
- **Quick navigation buttons**: Color-coded for easy section access

### 6. **Customer Interaction Matrix** - 📋 Comprehensive Taxonomy
- **Two-tab interface**: "Repeat Customer Interaction Base" and "Additional Dimensions"
- **L0-L6 Levels**: Core interaction taxonomy from CX Focus to Time Span
- **L7-L8 Levels**: Customer Context and Temporal/Reporting dimensions
- **Color-coded levels**: Each interaction level has distinct colors for easy identification
- **Interactive tables**: Detailed breakdown of customer interaction patterns
- **Professional styling**: Clean, readable tables with Inter font family

## Component Details

### Sidebar Navigation
- **Fixed width** on medium screens and larger
- **Collapsible on mobile** with overlay
- **Expandable sections** for Metrics, CX Impact, Methodology, and Metrics Dictionary
- **Active state indicators** for current view
- **4 clear sub-navigations** under Metrics section
- **Methodology sub-navigation** includes:
  - Methodology (main documentation)
  - Customer Interaction Matrix (detailed taxonomy)

### Navigation Structure
```
📊 Metrics
  ├── CS Channel Trends: Repeat
  ├── CS Channel Trends: No Repeat
  ├── Total Interactions
  ├── Self-Service: Bot Channels
  ├── Human-Led: CSA Channels
  └── Self-Guided: Visit Channels

⚡ CX Impact
  ├── P95 Analysis
  └── P90 Analysis

📋 Methodology
  ├── Methodology
  └── Customer Interaction Matrix

📚 Metrics Dictionary
  ├── Metrics Dictionary
  └── Channel Matrix Rules

❓ FAQs
```

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

## Troubleshooting

### Common Issues

#### Port Already in Use
If you see "Something is already running on port 3000":
1. **Option 1**: Press `Y` when prompted to run on another port
2. **Option 2**: Kill the existing process:
   ```bash
   lsof -ti:3000 | xargs kill -9
   npm start
   ```
3. **Option 3**: Use a specific port:
   ```bash
   PORT=3001 npm start
   ```

#### TypeScript Compilation Errors
If you encounter TypeScript errors:
1. Check for duplicate properties in object literals
2. Ensure all function parameters have proper type annotations
3. Run `npm run build` to see detailed error messages

#### Dependencies Issues
If you encounter dependency-related errors:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Development Tips

#### Accessing Customer Interaction Matrix
1. Start the application: `npm start`
2. Open the sidebar (hamburger menu on mobile)
3. Expand the "Methodology" section
4. Click on "Customer Interaction Matrix"

#### Hot Reloading
The development server supports hot reloading. Changes to components will automatically refresh the browser.

#### Browser Developer Tools
- Use React Developer Tools extension for component inspection
- Check the Console tab for any runtime errors
- Use the Network tab to monitor API calls (if applicable)

## Support

For questions or support, please open an issue in the repository.
