import { useState } from 'react';
import { IconX, IconPassword, IconCheck } from '@tabler/icons-react';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';


function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function CustomPasswordInput(props: any) {
  const { form, fieldName, label } = props
  const [popoverOpened, setPopoverOpened] = useState(false);

  const value = form.values[fieldName]
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Box mx="auto">
      <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              radius={"md"}
              withAsterisk
              label={label}
              placeholder="Enter Password"
              icon={<IconPassword stroke={1.5} />}
              value={value}
              {...form.getInputProps(fieldName)}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          <PasswordRequirement label="Includes at least 8 characters" meets={value.length > 7} />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
}

export default CustomPasswordInput