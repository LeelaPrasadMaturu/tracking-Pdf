from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from io import BytesIO

def add_tracking_pixel(input_pdf, output_pdf, tracking_pixel_url):
    # Create a new blank PDF with the tracking pixel
    packet = BytesIO()
    can = canvas.Canvas(packet)
    # Embed the tracking URL instead of a local image
    can.drawImage(tracking_pixel_url, 10, 10, width=1, height=1)  # Adjust position if needed
    can.save()
    packet.seek(0)

    # Load the original PDF
    original_pdf = PdfReader(input_pdf)
    writer = PdfWriter()

    # Merge the tracking pixel page with the original PDF pages
    tracking_pdf = PdfReader(packet)
    for page in original_pdf.pages:
        page.merge_page(tracking_pdf.pages[0])  # Overlay pixel on each page
        writer.add_page(page)

    # Write the new PDF
    with open(output_pdf, "wb") as out_file:
        writer.write(out_file)

add_tracking_pixel("input.pdf", "tracked_output.pdf", "https://tracking-pdf.onrender.com/track")
# add_tracking_pixel("input.pdf", "tracked_output.pdf", "http://localhost:3000/track")
