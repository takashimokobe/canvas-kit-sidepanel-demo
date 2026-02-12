import { SecondaryButton } from '@workday/canvas-kit-react/button';
import { SidePanel, useSidePanelModel } from '@workday/canvas-kit-labs-react/side-panel';
import { Flex } from '@workday/canvas-kit-react/layout';
import { Text } from '@workday/canvas-kit-react/text';
import { CanvasProvider } from '@workday/canvas-kit-react/common';
import { createStyles, px2rem } from '@workday/canvas-kit-styling';
import { system } from '@workday/canvas-tokens-web';
import { useDirection } from './useDirection';
import './index.css';

// More dramatic spacing differences for better visualization
// xs = x1 (4px), sm = x4 (16px), md = x8 (32px), lg = x14 (56px), xl = x16 (64px), xxl = x20 (80px)
const space = {
  xs: system.space.x1,   // 4px
  sm: system.space.x4,   // 16px
  md: system.space.x8,   // 32px
  lg: system.space.x14,  // 56px
  xl: system.space.x16,  // 64px
  xxl: system.space.x20, // 80px
};

const styles = {
  container: createStyles({
    flexDirection: 'column',
    gap: system.space.x4,     // Keep container gap moderate (16px)
    padding: system.space.x4, // Keep container padding moderate (16px)
  }),
  exampleRow: createStyles({
    gap: system.space.x2,     // Keep row gap small (8px)
    alignItems: 'stretch',
  }),
  exampleColumn: createStyles({
    flexDirection: 'column',
    flex: 1,
  }),
  viewport: createStyles({
    height: px2rem(320),
    backgroundColor: system.color.bg.alt.default,
    border: `1px solid ${system.color.border.divider}`,
    borderRadius: system.shape.x2,
  }),
  main: createStyles({
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: system.space.x4, // Fixed 16px padding
  }),
  label: createStyles({
    fontSize: system.fontSize.body.small,
    color: system.color.text.default,
    fontWeight: system.fontWeight.bold,
    marginBottom: system.space.x2, // Fixed 8px margin
  }),
  // Wrapper container for heading - provides visual outline
  headingContainer: createStyles({
    outline: '2px solid red',
  }),
  // Different padding variations for heading (using t-shirt sizes)
  // Applied directly to heading element
  headingNoPadding: createStyles({
    padding: system.space.zero,
  }),
  headingXs: createStyles({
    paddingY: space.xs,
    paddingX: space.xs,
  }),
  headingSm: createStyles({
    paddingY: space.sm,
    paddingX: space.sm,
  }),
  headingMd: createStyles({
    paddingY: space.md,
    paddingX: space.md,
  }),
  headingLg: createStyles({
    paddingY: space.lg,
    paddingX: space.lg,
  }),
  headingXl: createStyles({
    paddingY: space.xl,
    paddingX: space.xl,
  }),
  headingAsymmetric: createStyles({
    paddingTop: space.xs,
    paddingBottom: space.lg,
    paddingLeft: space.xl,
    paddingRight: space.xs,
  }),
};

interface PanelExampleProps {
  label: string;
  headingStyle: string;
  variant?: 'standard' | 'alternate';
  expandedWidth?: number;
  collapsedWidth?: number;
}

function PanelExample({ 
  label, 
  headingStyle, 
  variant = 'alternate',
  expandedWidth = 320,
  collapsedWidth = 64
}: PanelExampleProps) {
  const model = useSidePanelModel();
  const isExpanded =
    model.state.transitionState === 'expanded' || model.state.transitionState === 'expanding';

  return (
    <Flex cs={styles.exampleColumn}>
      <Text cs={styles.label}>{label}</Text>
      <Flex cs={styles.viewport}>
        <SidePanel 
          model={model} 
          variant={variant}
          expandedWidth={expandedWidth}
          collapsedWidth={collapsedWidth}
        >
          <SidePanel.ToggleButton />
          <Flex cs={styles.headingContainer}>
            <SidePanel.Heading size="small" hidden={!isExpanded} cs={headingStyle}>
              {label}
            </SidePanel.Heading>
          </Flex>
        </SidePanel>
        <Flex as="main" cs={styles.main}>
          <Text as="p" typeLevel="body.small" textAlign="center">
            Example content
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function App() {
  const { direction, toggleDirection } = useDirection();

  return (
    <CanvasProvider dir={direction}>
      <Flex cs={styles.container}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h1" typeLevel="heading.large">
            SidePanel Heading Padding Examples
          </Text>
          <SecondaryButton onClick={toggleDirection}>
            Direction: {direction.toUpperCase()}
          </SecondaryButton>
        </Flex>

        <Flex cs={styles.exampleRow}>
          <PanelExample 
            label="No Padding" 
            headingStyle={styles.headingNoPadding}
            expandedWidth={200}
            collapsedWidth={56}
          />
          <PanelExample 
            label="Extra Small (xs)" 
            headingStyle={styles.headingXs}
            expandedWidth={220}
            collapsedWidth={60}
          />
        </Flex>

        <Flex cs={styles.exampleRow}>
          <PanelExample 
            label="Small (sm)" 
            headingStyle={styles.headingSm}
            expandedWidth={260}
            collapsedWidth={64}
          />
          <PanelExample 
            label="Medium (md)" 
            headingStyle={styles.headingMd}
            expandedWidth={320}
            collapsedWidth={80}
          />
        </Flex>

        <Flex cs={styles.exampleRow}>
          <PanelExample 
            label="Large (lg)" 
            headingStyle={styles.headingLg}
            expandedWidth={380}
            collapsedWidth={96}
          />
          <PanelExample 
            label="Extra Large (xl)" 
            headingStyle={styles.headingXl}
            expandedWidth={440}
            collapsedWidth={112}
          />
        </Flex>

        <Flex cs={styles.exampleRow}>
          <PanelExample 
            label="Asymmetric Padding" 
            headingStyle={styles.headingAsymmetric}
            expandedWidth={350}
            collapsedWidth={72}
          />
          <PanelExample 
            label="Medium (Baseline)" 
            headingStyle={styles.headingMd}
            expandedWidth={320}
            collapsedWidth={80}
          />
        </Flex>

        <Flex cs={styles.exampleRow}>
          <PanelExample
            label="Standard Variant (md)"
            headingStyle={styles.headingMd}
            variant="standard"
            expandedWidth={300}
            collapsedWidth={70}
          />
          <PanelExample
            label="Alternate Variant (md)"
            headingStyle={styles.headingMd}
            variant="alternate"
            expandedWidth={340}
            collapsedWidth={90}
          />
        </Flex>
      </Flex>
    </CanvasProvider>
  );
}
