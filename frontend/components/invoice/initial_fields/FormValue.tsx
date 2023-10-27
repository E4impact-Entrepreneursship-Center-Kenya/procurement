import { Text, Title } from "@mantine/core"

const FormValue = (props: any) => {
    const { title, value } = props
    const mb = 0
    return (
        <>
            <Title order={4} weight={500} mb={mb} size={'sm'}>{title}</Title>
            <Text size="xs">{value}</Text>
        </>
    )
}

export default FormValue