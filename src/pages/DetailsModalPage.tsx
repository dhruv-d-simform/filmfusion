import { useParams, useNavigate } from 'react-router';
import { useDetails } from '../hooks/useDetails';
import { DetailsModal } from '../components/DetailsModal';

export function DetailsModalPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { details, loading, error } = useDetails(id || null);

    if (!id) return null;
    if (loading) return null;
    if (error || !details) return null;

    return <DetailsModal media={details} onClose={() => navigate('/')} />;
}
