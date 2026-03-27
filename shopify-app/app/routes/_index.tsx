import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  Banner,
  BlockStack,
  InlineGrid,
  InlineStack,
  Icon,
  Box,
  Divider,
} from "@shopify/polaris";
import {
  ProductIcon,
  AutomationIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "QuickList AI - Dashboard" },
    { name: "description", content: "AI-powered product listing optimization" },
  ];
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" tone="subdued">
          {title}
        </Text>
        <Text as="p" variant="headingXl">
          {value}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {subtitle}
        </Text>
      </BlockStack>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Page title="QuickList AI">
      <BlockStack gap="500">
        <Banner
          title="Welcome to QuickList AI!"
          tone="info"
          onDismiss={() => {}}
        >
          <p>
            Optimize your product listings with AI for better visibility across
            Amazon, eBay, Etsy, and Shopify. Get started by optimizing your
            first product.
          </p>
        </Banner>

        <Text as="h2" variant="headingMd">
          Performance Overview
        </Text>

        <InlineGrid columns={3} gap="400">
          <StatCard
            title="Products Optimized"
            value="127"
            subtitle="+12 this week"
          />
          <StatCard
            title="Avg. Improvement"
            value="+34%"
            subtitle="SEO score increase"
          />
          <StatCard
            title="Time Saved"
            value="18h"
            subtitle="This month vs manual editing"
          />
        </InlineGrid>

        <Divider />

        <Text as="h2" variant="headingMd">
          Quick Actions
        </Text>

        <InlineGrid columns={3} gap="400">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="start" gap="200">
                <Icon source={ProductIcon} tone="base" />
                <Text as="h3" variant="headingSm">
                  Optimize Product
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd" tone="subdued">
                Optimize a single product listing with AI-powered suggestions
                for title, description, and tags.
              </Text>
              <Button
                variant="primary"
                onClick={() => navigate("/optimize")}
              >
                Optimize Now
              </Button>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <InlineStack align="start" gap="200">
                <Icon source={AutomationIcon} tone="base" />
                <Text as="h3" variant="headingSm">
                  Bulk Optimize
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd" tone="subdued">
                Select multiple products and optimize them all at once. Perfect
                for large catalog updates.
              </Text>
              <Button onClick={() => navigate("/bulk")}>
                Start Bulk Optimization
              </Button>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <InlineStack align="start" gap="200">
                <Icon source={SettingsIcon} tone="base" />
                <Text as="h3" variant="headingSm">
                  Settings
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd" tone="subdued">
                Configure your API key, brand voice, default marketplaces, and
                notification preferences.
              </Text>
              <Button onClick={() => navigate("/settings")}>
                Configure Settings
              </Button>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Divider />

        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">
                  Recent Optimizations
                </Text>
                <BlockStack gap="200">
                  {[
                    {
                      name: "Vintage Leather Messenger Bag",
                      marketplace: "Amazon",
                      improvement: "+41%",
                      time: "2 hours ago",
                    },
                    {
                      name: "Organic Cotton T-Shirt Pack",
                      marketplace: "Etsy",
                      improvement: "+28%",
                      time: "5 hours ago",
                    },
                    {
                      name: "Wireless Bluetooth Earbuds Pro",
                      marketplace: "eBay",
                      improvement: "+35%",
                      time: "1 day ago",
                    },
                    {
                      name: "Handmade Ceramic Coffee Mug",
                      marketplace: "Shopify",
                      improvement: "+22%",
                      time: "2 days ago",
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      padding="300"
                      background="bg-surface-secondary"
                      borderRadius="200"
                    >
                      <InlineStack align="space-between" blockAlign="center">
                        <BlockStack gap="100">
                          <Text as="p" variant="bodyMd" fontWeight="semibold">
                            {item.name}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {item.marketplace} &middot; {item.time}
                          </Text>
                        </BlockStack>
                        <Text as="p" variant="bodyMd" tone="success">
                          {item.improvement}
                        </Text>
                      </InlineStack>
                    </Box>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">
                  Your Plan
                </Text>
                <Box
                  padding="400"
                  background="bg-surface-secondary"
                  borderRadius="200"
                >
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="p" variant="headingMd">
                        Free Plan
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        $0/mo
                      </Text>
                    </InlineStack>
                    <Text as="p" variant="bodySm" tone="subdued">
                      3 of 5 daily optimizations used
                    </Text>
                    <Box
                      background="bg-fill-info"
                      borderRadius="100"
                      minHeight="8px"
                    >
                      <Box
                        background="bg-fill-success"
                        borderRadius="100"
                        minHeight="8px"
                        maxWidth="60%"
                      />
                    </Box>
                    <Button onClick={() => navigate("/billing")}>
                      Upgrade Plan
                    </Button>
                  </BlockStack>
                </Box>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
