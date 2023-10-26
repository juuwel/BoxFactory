using System.Data;
using System.Diagnostics;
using System.Text.Json.Serialization;
using BoxFactoryAPI;
using BoxFactoryAPI.Exceptions;
using Core.Mapping;
using Core.Services;
using Infrastructure;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IDbConnection>(container =>
{
    var connection = new NpgsqlConnection(Environment.GetEnvironmentVariable("box_conn"));
    connection.Open();
    return connection;
});

builder.Services.AddScoped<BoxRepository>();
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddScoped<StatsRepository>();
builder.Services.AddScoped<BoxService>();
builder.Services.AddControllers(options => options.Filters.Add<ExceptionFilter>());
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<StatsService>();

builder.Services.AddScoped<DbInitialize>();

builder.Services.AddControllers().AddJsonOptions(options => 
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var frontEndRelativePath = "BFF/dist/";
builder.Services.AddSpaStaticFiles(conf => conf.RootPath = frontEndRelativePath);

var app = builder.Build();

app.UseCors(options =>
{
    options.SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.UseExceptionHandler(a => a.Run(async context => {
    var trace = Activity.Current?.Id ?? context.TraceIdentifier;
    const int statusCode = StatusCodes.Status500InternalServerError;

    context.Response.StatusCode = statusCode;
    await context.Response.WriteAsJsonAsync(
        new ErrorResponse("", statusCode, trace, "Something went wrong"));
}));

if (app.Environment.IsDevelopment())
{
    if (args.Contains("db-init") || args.Contains("--db-init"))
    {
        using var scope = app.Services.CreateScope();
        var dbInitializer = scope.ServiceProvider.GetRequiredService<DbInitialize>();
        await dbInitializer.InitializeData();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseSpa(conf =>
{
    conf.Options.SourcePath = frontEndRelativePath;
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();