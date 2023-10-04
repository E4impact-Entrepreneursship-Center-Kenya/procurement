import { HoverCard, Button, Text, Group, ActionIcon } from '@mantine/core';
import { IconExclamationMark } from '@tabler/icons';

interface ICustomHoverCard {
    description: string
    color?: string
}

export default function CustomHoverCard({ description }: ICustomHoverCard) {
    return (
        <Group position="center">
            <HoverCard width={280} shadow="md">
                <HoverCard.Target>
                    <ActionIcon color='green' variant='outline'>
                        <IconExclamationMark  />
                    </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="sm">
                        {description}
                    </Text>
                </HoverCard.Dropdown>
            </HoverCard>
        </Group>
    );
}