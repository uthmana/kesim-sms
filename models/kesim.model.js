module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      qurbanId: String,
      detailId: String,
      contactNo: String,
      country: String,
      type: Boolean,
      isCut: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Kesim = mongoose.model("kesim", schema);
  return Kesim;
};
