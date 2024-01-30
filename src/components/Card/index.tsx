type CardComponentPropsWithData = {
    data: {
        title: string;
    };
};

export default function Card({ data }: CardComponentPropsWithData ) {
    return (
        <div data-testid="card-component">
            <h1>{data.title}</h1>
        </div>
    );
}
