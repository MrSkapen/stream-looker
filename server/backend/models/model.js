module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            WatchmodeID: String,
            IMDBID: String,
            TMDBID: String,
            TMDBType: String,
            Title: String,
            Year: String

        },
        {collection: 'collection'}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("collection", schema);
};
