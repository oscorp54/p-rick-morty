import { useRouter } from 'next/router';

export default function ContactId() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>Un contacto en especifico {id}</div>
    )
}